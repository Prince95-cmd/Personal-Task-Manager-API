const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const taskModelSchema = new Schema({
    title : {
        type: String, 
        required: true
    },
    description : {
        type: String, 
        required: true
    },
    duration : {
        type: String, 
        required: true
    },
    status : {
        type: String, 
        required: true,
        default: 'pending'
    },
    date : {
        type: Date, 
        required: true,
        default: new Date().toISOString().split('T')[0]
    },
    startTime : {
        type: String, 
        required: true,
        default: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
    endTime : {
        type: String, 
        required: true,
        default: new Date(new Date().getTime() + 60*60*1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
})

module.exports = mongoose.model('Task', taskModelSchema);