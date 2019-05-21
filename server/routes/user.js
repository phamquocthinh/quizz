const express = require('express')
const moment = require('moment')

const Users = require('../models/user')

let user = express.Router()

user.get('/', async(req, res) => {
    let daysAgo = req.query.daysAgo
    let condition = {}
    let usersList = []

    if (daysAgo) {
        let today = moment().format("YYYY-MM-DD") + 'T23:59:59'
        let fromTime = moment(today).subtract(parseInt(daysAgo), 'days').toDate()

        condition = {
            createdAt: {
                $gte: fromTime
            }
        }

        usersList = await Users.find(condition).sort({'createdAt': -1})
    } else {
        usersList = await Users.find().sort({'createdAt': -1}).limit(100)
    }

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