// add middlewares here related to projects
const Project = require('./projects-model');

async function validateId(req,res,next) {
    try {
        const project =  await Project.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: "no id"})
        } else {
            req.id = project
            next()
        }
    } catch(err) {
        res.status(500).json({message: err})
    }
}

function validatePost(req, res, next) {
    const {completed, description, name} = req.body
    if(!description || !name || !completed) {
        res.status(400).json({message: 'required field'})
    } else {
        req.name = name
        req.description = description
        req.completed = completed
        next()
    }
}

function validateRequestBody(req, res, next) {
    const { completed, description, name } = req.body;
  
    if (typeof completed !== 'boolean' || typeof description !== 'string' || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid request body.' });
    }
  
    // Validation passed, proceed to the next middleware or route handler
    next();
  }

module.exports = {
    validateId,
    validatePost,
    validateRequestBody

}