// Write your "projects" router here!
const express = require('express')
const { validateId,
       validatePost,
      validateRequestBody
} = require('./projects-middleware')
const router = express.Router();

const Project = require('./projects-model');


router.get('/' , (req,res,) => { 
  Project.get()
  .then( project =>
    res.json(project)
  )
  .catch(err=> res.json(err))
})

router.get('/:id' , validateId, (req,res) => { 
  res.json(req.id)
})

router.post('/', validatePost, async (req,res,next) =>  { //eslint-disable-line
  try {
    const result =  await Project.insert({
      name: req.name,
      description: req.description,
      completed: req.completed
    })
    res.status(201).json(result)
  } catch(err) {
    res.status(500)
  }
})

router.put('/:id',  validateRequestBody, async (req,res) => {
 try {
  const result = await Project.update(req.params.id, req.body)
  res.json(result)
 } catch(err) {
    res.status(500)
 }
})


router.delete('/:id', validateId,  async (req,res) => {
try { 
  await Project.remove(req.params.id)
  res.json(req.id)
} catch(err) {
  res.status(500)
}
})

router.get('/:id/actions', validateId,  async (req,res) => {
  try {
   const result =  await Project.getProjectActions(req.params.id)
   if(!result) {
    res.json([])
  } else {
    res.json(result)
  } 
  } catch(err) {
    res.status(500)
  }
})



module.exports = router