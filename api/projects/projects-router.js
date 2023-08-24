// Write your "projects" router here!
const express = require('express')

const router = express.Router();



router.get('/' , (req,res,next) => { //eslint-disable-line
  res.json({message: 'aay'})
})

module.exports = router