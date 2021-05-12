import client from '../../dbClient.js';

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
      const update = await update(id);
    }
    else if(req.method === 'DELETE')
    {
      const id = req.query.id;
      const remove = await remove(id);
       
      // Delete a project

      // Use paramter in URL to decide which project is being deleted

      // use delete query to delete project from the database

      // Send OK if deleted 
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
getOne().catch(console.dir);

async function update(id) 
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
update().catch(console.dir);


async function remove(id) 
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
remove().catch(console.dir);

