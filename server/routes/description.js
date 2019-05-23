const express = require('express')

const Descriptions = require('../models/description')

let description = express.Router()

description.get('/', async(req, res) => {
    let items = await Descriptions.find()
    let data = {}
    items.forEach(item => {
        data[item.id] = item.description
    })
    return res.render('description', { data })
})

description.post('/', async(req, res) => {
    try {
        let data = req.body
        for (const key in data) {
            let item = await Descriptions.findOne({id: key})
            if (item){
                await Descriptions.findByIdAndUpdate(item._id, {description: data[key]})
            } else {
                await Descriptions.insertMany([{id: key, description: data[key]}])
            }
        }
        
        return res.json({message: 'ok', data})
    } catch(e) {
        res.json({message: 'error', data: {}})
    }
})

description.post('/list', async(req, res) => {
    try {
        let items = await Descriptions.find()
        let data = {}

        items.forEach(item => {
            data[item.id] = item.description
        })

        return res.json({message: 'ok', data})
    } catch(e) {
        res.json({message: 'error', data: {}})
    }
})

module.exports = description