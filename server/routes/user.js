const express = require('express')

const Users = require('../models/user')

let user = express.Router()

user.get('/', async(req, res) => {
    let usersList = await Users.find()
    return res.render('user', { data: usersList })
})

user.post('/', async(req, res) => {
    try {
        let {
            name,
            email,
            phoneNumber
        } = req.body

        await Users.create({name, email, phoneNumber})
        return res.json({message: 'ok'})
    } catch(e) {
        console.log(e)
        res.json({message: 'error'})
    }
})

module.exports = user