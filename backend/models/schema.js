const mongoose = require('mongoose')

const taskschema = new mongoose.Schema({
    taskname: {type: String, required: true},
    description: {type: String},
    priority: {type: String},
    status: {type: Boolean}
}, {timestamps: true})

const userschema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [taskschema]
}, {timestamps: true})

module.exports = mongoose.model('User', userschema)