// add middlewares here related to actions
const Action = require('./actions-model');


async function validateId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "no id"
            })
        } else {
            req.id = action
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

function validateBody(req, res, next) { //eslint-disable-line
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: 'required field' })
    } else {
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next()
    }
}


function validatePut(req, res, next) { //eslint-disable-line
    const { completed, project_id, description, notes } = req.body
    if (!completed || !project_id || !description || !notes) {
        res.status(400).json({ message: 'required field' })
    } else {
        req.completed = completed
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next()
    }
}

module.exports = {
    validateBody,
    validateId,
    validatePut
}