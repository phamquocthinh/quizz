const express = require('express')

const Questions = require('../models/question')

let question = express.Router()

question.get('/', async(req, res) => {
    let questionList = await Questions.find()
    return res.render('question', { data: questionList })
})

question.post('/', async(req, res) => {
    try {
        let data = await Questions.find()
        return res.json({message: 'ok', data})
    } catch(e) {
        res.json({message: 'error', data: {}})
    }
})

question.post('/update', async(req, res) => {
    try {
        let {id, answers} = req.body
        await Questions.findByIdAndUpdate(id, {answers: answers})
        res.json({message: 'ok'})
    } catch(e) {
        res.json({message: 'error', data: {}})
    }
})

question.post('/delete', async(req, res) => {
    try {
        let {id} = req.body
        await Questions.findByIdAndRemove(id)
        res.json({message: 'ok'})
    } catch(e) {
        res.json({message: 'error', data: {}})
    }
})

module.exports = question