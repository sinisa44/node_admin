const mongoose = require('mongoose');
const validator = require('validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const clientSchema = new mongoose.Schema({
    orderId:Number,
    name:{
        type:String,
        required:true,        
    },
    clientType:{
        type:String,
        enum:['Private', 'Business']        
    },
    address:{
        type:String
    },
    city:String,
    postCode: Number,
    isActive:{
        type:Boolean,
        default:true
    },
    sameTech:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:false,
        validate:[validator.isEmail, 'email is invalid']
    },
    hostings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hosting'
    }],
    domains:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Domain'
    }]

})

clientSchema.plugin(autoIncrement.plugin, { model: 'Client', field: 'orderId' });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;