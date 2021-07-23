import { NormalModuleReplacementPlugin } from "webpack";

const { MongoClient } = require("mongodb");
const uri = encodeURI(process.env.MONGODB_URI);
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true },{ connectTimeoutMS: 10000 }, { keepAlive: 1});

export default async(req, res) => {

    if(req.method === 'GET')
    {
      const id = req.query.id;
      const project = await getOne(id);
      if(project === null)
      {
        res.status(404).send("Not Found");
      }
      else
      {
        res.status(200).json(project);
      }
      
    }
    else if(req.method === 'PUT')
    {
      const id = req.query.id;
      const body = req.body;
      const valid = validateBody(body);
      if(valid.valid)
      {
        const updated = await update(id,body);
        if(updated)
        {
          res.status(200).send("Updated");
        }
        else
        {
          res.status(400).send("Bad Request");
        }
        
      }
      else
      {
        res.status(404).send("Bad Request");
      }
      
    }
    else if(req.method === 'DELETE')
    {
      const id = req.query.id;
      const check = await remove(id);
      console.log(check);
      if(check)
      {
        res.status(200).send("Deleted");
      }
      else
      { 
        res.status(404).send("Not Found");
      }
    }
    else
    {
      res.status(403).send("Invalid request type");
    }
  }

async function getOne(id) 
{
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    const query = { projectID: parseInt(id) };
    const project = await projects.findOne(query);
    var linkList = [];
    await links.find(query).forEach((link) => {
      linkList.push(link);
    });
    if(project === null)
    {
      return null;
    }
    else
    {
      project.links = linkList;
      return project;
    }
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {
  }
}

function validateBody(body)
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
              "linkID": {"type": "integer"},
              "name": {"type": "string"},
              "type": {"type": "string"},
              "url": {"type": "string"}
            },
            "required": ["linkName","linkType","url"],
            }
          }
        },
      "additionalProperties": false
    };
  const result = v.validate(body,schema,{required: true});
  return result;
}

async function update(id,body) 
{
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    const query = { projectID: parseInt(id) };
    const linkList = body.links;
    delete body.links;
    const update = [{ $set: body }];
    const project = await projects.updateOne(query,update);
    const isLinks = body.links != []; 
    if(isLinks)
    {
      var linkChanged = [];
      var linkIDs = [];
      linkList.forEach(async(link) => {
        const linkID = link.linkID;
        if(linkID == 0)
        {
          link.projectID = id;
          // need to give the link an id
          const linkOptions = {
            sort: {linkID: -1},
            projection: {linkID: 1},
          }
          const linkWithID = await links.findOne({},linkOptions);
          link.linkID = linkWithID.linkID + 1;
          const inserted = await links.insertOne(link);
          linkChanged.push(inserted.result);
        }
        else
        {
          const query = {linkID: parseInt(linkID), projectID: parseInt(id)};
          linkIDs.push(linkID);
          delete link.linkID;
          const update = [{$set: link}];
          const l = await links.updateOne(query,update);
          linkChanged.push(l.result);
        }
      })
      // Delete all links with Ids not in the body.
      const query = {linkID: {$nin: linkIDs},projectID: parseInt(id)};
      const dl = await links.deleteMany(query);
      return project.result && linkChanged && dl.result;
    }
    else
    {
      return project.result;
    }
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {
  }
}


async function remove(id) 
{
  // It didn't successfully remove all the links because there were none.
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    const query = { projectID: parseInt(id) };
    const project = await projects.deleteOne(query);
    const link = await links.deleteMany(query);
    return project.result && link.result;
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {
  }
}


