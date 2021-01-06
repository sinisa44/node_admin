const mongoose = require('mongoose');
const moment = require('moment');

const domainSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    expires:String,
    period:{
        type:Number,
        enum:[1,3,5,7,10],
        required:[true, 'period is required']
    },
    active:{
        type:Boolean,
        default:true
    }
});

domainSchema.pre('save', function(next) {
    const date = moment();

    date.add(this.period, 'years');
    
    const newDate = date.format('MM-DD-YYYY');

    this.expires = newDate;

    next();
})



const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
