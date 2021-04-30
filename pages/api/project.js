export default (req, res) => {

    if(req.method === 'GET')
    {
      //Get project

      // Use the paramater in URL to know project ID

      // Get project with ID from database
      
      // Convert data to JSON

      // Send JSON if successful
  
    }
    else if(req.method === 'POST')
    {
      // Use body to convert into SQL query

      // Send query to database

      // Send a 201 if created
    }
    else if(req.method === 'PATCH')
    {
      // Use parameter in URL to help query

      // Use body to determine what needs editing

      // Send an UPDATE query to database

      // Send an OK if updated
    }
    else if(req.method === 'DELETE')
    {
      // Delete a project

      // Use paramter in URL to decide which project is being deleted

      // use delete query to delete project from the database

      // Send OK if deleted
    }
  
    res.status(200).json({ name: 'John Doe' })
  }