const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Users = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: String,
    createdAt: {type: Date, default: new Date()}
}, { collection: 'user' });

module.exports = mongoose.model('user', Users);
