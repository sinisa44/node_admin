const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['CREATE', 'UPDATE', 'DELETE']
    },
    name:{
        type:String,
        enum:['Domain','Hosting']
    }
})

const Log = mongoose.model('Log', logSchema );

module.exports = Log;