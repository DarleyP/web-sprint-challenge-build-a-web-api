// Write your "actions" router here!
const express = require('express')
const { validateBody, validateId, validatePut } = require('./actions-middlware') // eslint-disable-line
const router = express.Router();

const Action = require('./actions-model')

router.get('/', (req, res) => {
    Action.get()
        .then(action =>
            res.json(action)
        )
        .catch(err => res.json(err))
})

router.get('/:id', validateId, async (req, res) => {
    await Action.get(req.params.id)
        .then(action =>
            res.json(action)
        )
        .catch(err => res.json(err))
})


router.post('/', validateBody, async (req, res) => {
    try {
        const result = await Action.insert({
            project_id: req.project_id,
            description: req.description,
            notes: req.notes
         })
        res.status(201).json(result)
    } catch (err) {
        res.status(500)
    }
})

router.put('/:id', validateId, validatePut, async (req,res) => {
    try {
        const result = await Action.update(req.params.id, req.body) 
        res.json(result)
    } catch(err) {
        res.status(500)
    }
} )

router.delete('/:id' ,validateId, async (req,res) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.id)
    } catch(err) {
        res.json(500)
    }
})

module.exports = router