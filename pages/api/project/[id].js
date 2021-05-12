const { MongoClient } = require("mongodb");
const uri = encodeURI(process.env.MONGODB_URI);
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true },{ connectTimeoutMS: 10000 }, { keepAlive: 1});

export default async(req, res) => {

    if(req.method === 'GET')
    {
      const id = req.query.id;
      const project = await getOne(id);
      res.status(200).json(project);
    }
    else if(req.method === 'PATCH')
    {
      const id = req.query.id;
      const body = req.body;
      if(validateBody(body))
      {
        const updated = await update(id,body);
        if(updated)
        {
          res.status(200).send("Updated");
        }
        else
        {
          res.status(500).send("Unsuccessful Update");
        }
        
      }
      else
      {
        res.status(400).send("Bad Request");
      }
      
    }
    else if(req.method === 'DELETE')
    {
      const id = req.query.id;
      const removes = await remove(id);
      res.status(200).send("Deleted");
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
    project.links = linkList;
    return project;
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
  // Need to check that its valid schema
  const checkTitle = body.hasOwnProperty("title");
  const checkType = body.hasOwnProperty("type");
  const checkLanguage = body.hasOwnProperty("language");
  const checkDescription = body.hasOwnProperty("description");
  const checkLinks = body.hasOwnProperty("links");
  const checkProject = checkTitle || checkType || checkLanguage || checkDescription;
  if(checkLinks)
  {
    var linkCheck = [];
    body.links.forEach((link) =>{
      const checkLinkID = link.hasOwnProperty("linkID");
      const checkLinkName = link.hasOwnProperty("linkName");
      const checkLinkType = link.hasOwnProperty("linkType");
      const checkURL = link.hasOwnProperty("url");
      const checkBody = checkLinkName || checkLinkType || checkURL;
      const check = checkLinkID && checkBody;
      linkCheck.push(check);
    })
    return !linkCheck.includes(false);
  }
  return checkProject;

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
    var linkChanged = [];
    linkList.forEach(async(link) => {
      const query = {linkID: parseInt(link.linkID)};
      delete link.linkID;
      const update = [{$set: link}];
      const l = await links.updateOne(query,update);
      linkChanged.push(l.result);
    })
    return project.result && !linkChanged.includes(false);
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


