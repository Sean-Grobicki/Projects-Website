import project from "./project";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async(req, res) => {

  if(req.method === 'GET')
  {
    // Sort out the query parameters
    const queryParams = req.query;
    const query = formatQuery(queryParams);
    const number = getNumber(queryParams);
    const offset = getOffset(queryParams);
    const projects = await getProjects(query,number,offset);
    res.status(200).json(projects);
  }
}

function formatQuery(queryParams)
{
  var query = {};
  if(queryParams.type !== undefined)
  {
    query.type = queryParams.type;
  }
  if(queryParams.lan !== undefined)
  {
    query.language = queryParams.lan;
  }
  return query;
}


function getNumber(queryParams)
{
  var number = 5;
  if(queryParams.num !== undefined)
  {
    number = queryParams.num;
  }
  return number;
}

function getOffset(queryParams)
{
  var offset = 0;
  if(queryParams.off !== undefined)
  {
    offset = queryParams.off;
  }
  return offset;
}



const { MongoClient } = require("mongodb");
const uri = encodeURI("mongodb+srv://sg242:root@portfolio.89the.mongodb.net/projects?retryWrites=true&w=majority");
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true },{ connectTimeoutMS: 30000 }, { keepAlive: 1});

async function getProjects(query,number,offset) 
{
  try {
    await client.connect();
    const database = client.db('projects');
    const projects = database.collection('project');
    const links = database.collection('link');
    var projectList = [];
    await projects.find(query).forEach((project) =>
      {
        projectList.push(project);
      });
    for (let index = 0; index < projectList.length; index++) {
      const linkQuery = {projectID: projectList[index].projectID};
      var linkList = [];
      await links.find(linkQuery).forEach((link) => {
        linkList.push(link);
      })
      projectList[index].links = linkList;
    }
    return projectList;
  }
  catch(err)
  {
    console.log(err);
  } 
  finally 
  {
  }
}

getProjects().catch(console.dir);
