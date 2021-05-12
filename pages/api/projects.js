const { MongoClient } = require("mongodb");
const uri = encodeURI(process.env.MONGODB_URI);
const client = new MongoClient(uri,{ useUnifiedTopology: true}, { useNewUrlParser: true },{ connectTimeoutMS: 10000 }, { keepAlive: 1});

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async(req, res) => {

  if(req.method === 'GET')
  {
    const queryParams = req.query;
    if(queryParams.language === 'C')
    {
        queryParams.language = 'C#';
    }
    const number = getNumber(queryParams);
    const offset = getOffset(queryParams);
    const projects = await getProjects(queryParams,number,offset);
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
    // Add code to get the number and offset paramaters to work.
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
