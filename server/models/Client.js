const mongoose = require('mongoose');
const validator = require('validator');


const clientSchema = new mongoose.Schema({
    order_id:Number,
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
        validate:[validator.isEmail, 'email is invalid']
    },
    hostings:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hosting'
    },
    domains:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Domain'
    }

})


module.exports = clientSchema;