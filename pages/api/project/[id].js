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
    else if(req.method === 'PATCH')
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
          console.log("update False");
          res.status(400).send("Bad Request");
        }
        
      }
      else
      {
        console.log("ValidateBody False");
        res.status(400).send("Bad Request");
      }
      
    }
    else if(req.method === 'DELETE')
    {
      const id = req.query.id;
      const check = await remove(id);
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
    "anyOf": [
      {"required": ["title"]},
      {"required": ["type"]},
      {"required": ["language"]},
      {"required": ["description"]},
      {"required": ["links"]},
    ],
    "properties": {
      "title": {"type": "string",},
      "type": {"type": "string"},
      "language": {"type": "string"},
      "description": {"type": "string"},
      "links": {
        "type": "array",
        "items": {
          "properties":{
            "linkID": {"type": "number"},
            "linkName": {"type": "string"},
            "linkType": {"type": "string"},
            "url": {"type": "string"}
          },
          "required": ["linkID"],
          "anyOf": [
            {"required": ["linkName"]},
            {"required": ["linkType"]},
            {"required": ["url"]}
          ]
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
    const isLink = body.links !== null && body.links !== undefined;
    var linkList = [];
    var project;
    if(isLink)
    {
      linkList = body.links;
      delete body.links;
    }
    const onlyLink = isLink && Object.keys(body).length === 0;
    if(!onlyLink)
    {
      const update = [{ $set: body }];
      project = await projects.updateOne(query,update);
    }
    if(isLink)
    {
      var linkChanged = [];
      linkList.forEach(async(link) => {
        const query = {linkID: parseInt(link.linkID), projectID: parseInt(id)};
        delete link.linkID;
        const update = [{$set: link}];
        const l = await links.updateOne(query,update);
        linkChanged.push(l.upsertedCount);
      })
      const notUpdate = linkChanged.includes(0) || linkChanged === [];
      if(onlyLink)
      {
        return !notUpdate;
      }
      else
      {
        return project.result && !notUpdate;
      }
    }
    else
    {
      console.log("No Links")
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
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    const query = { projectID: parseInt(id) };
    const project = await projects.deleteOne(query);
    const link = await links.deleteMany(query);
    return project.deletedCount != 0 && link.deletedCount != 0;
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {
  }
}


