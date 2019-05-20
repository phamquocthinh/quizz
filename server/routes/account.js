const express = require('express')
let user = express.Router()

let sess
const account = {
    name: 'admin',
    password: 'admin@123456'
}

user.route('/').get((req, res) => {
    res.render('account', { message: '' })
})

user.route('/login')
    .get((req, res) => {
        res.render('account', { message: '' })
    })
    .post((req, res) => {
        sess = req.session
        if (req.body.user_name == null || req.body.password == null) {
            res.render('account', {
                message: 'Required Params Are Missing'
            })
        }
        if (req.body.user_name === account.name && req.body.password === account.password) {
            sess.USER = req.body.user_name
            res.redirect('/user')
        } else {
            res.render('account', {
                message: 'Wrong account/password'
            })
        }
    })

user.route('/logout').get(async (req, res) => {
    sess = req.session
    sess.USER = null
    res.redirect('/account/login')
})

module.exports = user
