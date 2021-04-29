// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//This can be called by http://localhost:3000/projects
export default (req, res) => {

  if(req.method === 'GET')
  {
    //Get projects

  }
  else if(req.method === 'POST')
  {
    // Add a project
  }
  else if(req.method === 'DELETE')
  {
    // Delete a project
  }

  res.status(200).json({ name: 'John Doe' })
}
