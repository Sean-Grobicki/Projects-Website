const { MongoClient } = require("mongodb");
const uri = encodeURI(process.env.MONGODB_URI);
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true },{ connectTimeoutMS: 10000 }, { keepAlive: 1});

export default async(req, res) => {

    if(req.method === 'POST')
    {
      var body = req.body;
      if(checkValid(body))
      {
        body = await addIDs(body);
        const created = await addProject(body);
        console.log(created);
        if(created)
        {
          res.status(201).send("Created");
        }
        else
        {
          res.status(400).send("Unable to add project");
        }
      }
      else
      {
        res.status(400).send("Bad Request");
      }
    }
    else
    {
      res.status(403).send("Invalid request type");
    }
}


function checkValid(body)
{
  const Validator = require('jsonschema').Validator;
  var v = new Validator();
  var schema = {
    "type": "object",
    "required": ["title","type","language","description"],
    "properties": {
      "projectID": {"type": "integer"},
      "title": {"type": "string",},
      "type": {"type": "string"},
      "language": {"type": "string"},
      "description": {"type": "string"},
      "links": {
        "type": "array",
        "items": {
          "properties":{
            "linkName": {"type": "string"},
            "linkType": {"type": "string"},
            "url": {"type": "string"}
          },
          "required": ["linkName","linkType","url"],
          }
        }
      },
    "additionalProperties": false
  };
  const result = v.validate(body,schema,{required: true});
  return result.valid;
}

async function addIDs(body)
{
  // Do a findone query on projectID with sort highest to lowest to get max projectID
  var projectID;
  var linkID;
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    const projectOptions = {
      sort: {projectID: -1},
      projection: {projectID: 1},
    }

    const project = await projects.findOne({},projectOptions);
    const linkOptions = {
      sort: {linkID: -1},
      projection: {linkID: 1},
    }
    const link = await links.findOne({},linkOptions);

    projectID = project.projectID + 1;
    linkID = link.linkID + 1;

    body.projectID = projectID;
    if(body.links != [])
    {
      body.links.forEach((link) => {
        link.linkID = linkID;
        link.projectID = projectID;
        linkID += 1;
      });
    }
    return body;
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {

  }
}
addProject().catch(console.dir);


async function addProject(body) 
{
  // Same again here as there is no checks on links
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    
    const links = database.collection('link');
    
    var linkList = body.links;
    var project = body;
    delete project.links;
    const result = await projects.insertOne(project);
    if (linkList.length == 0)
    {
      return result.insertedId != -1;
    }
    const options = {ordered: true}
    const linkResult = await links.insertMany(linkList,options);
    if(result.insertedId != -1 &&  linkResult.insertedCount === linkList.length)
    {
      return true;
    }
    return false;
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {

  }
}
addProject().catch(console.dir);