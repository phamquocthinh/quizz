const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Questions = new Schema({
    question: Number,
    answers: [
        {
            data: String,
            ans: String
        }
    ],
    createdAt: {type: Date, default: new Date()}
}, { collection: 'question' });

module.exports = mongoose.model('question', Questions);
