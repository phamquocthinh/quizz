const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Descriptions = new Schema({
    id: String,
    description: String,
    createdAt: {type: Date, default: new Date()},
    updatedAt: Date
}, { collection: 'description' });

module.exports = mongoose.model('description', Descriptions);
