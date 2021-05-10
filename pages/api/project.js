import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import client from '../dbClient';

export default async(req, res) => {

    if(req.method === 'POST')
    {
      var body = req.body;
      if(checkValid(body))
      {
        body = await addIDs(body);
        const created = await addProject(body);
        if(created)
        {
          res.status(201).send("Created");
        }
        else
        {
          res.status(500).send("Unable to add project");
        }
      }
      else
      {
        res.status(400).send("Bad Request");
      }
      
    }
    
}


function checkValid(body)
{
  if(body === undefined || body === null)
  {
    return false;
  }
  const undefCheckProj = body.title !== undefined && body.type !== undefined && body.language !== undefined && body.description !== undefined;
  const nullCheckProj = body.title !== null && body.type !== null && body.language !== null && body.description !== null;
  var linksCheck = [];
  if(body.links != undefined)
  {
    body.links.forEach((link) => {
      const undefCheckLink = link.name !==  undefined && link.type !== undefined && link.url !== undefined;
      const nullCheckLink = link.name !== null && link.type !== null && link.url !== null;
      linksCheck.push(undefCheckLink && nullCheckLink);
    })
  }
  else
  {
    return false;
  }
  if(linksCheck.includes(false))
  {
    return false;
  }
  return undefCheckProj && nullCheckProj;
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
    body.links.forEach((link) => {
      link.linkID = linkID;
      link.projectID = projectID;
    });
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
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    
    const links = database.collection('link');
    
    var linkList = body.links;
    var project = body;
    project.links = null;
    const result = await projects.insertOne(project);
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