const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required']
    },
    email:{
        type:String,
        // unique:true,
        required:[true, 'email is required'],
        validate:[validator.isEmail, 'email is invalid']
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;