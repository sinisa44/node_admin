const mongoose = require('mongoose');
const moment = require('moment');

const hostingSchema = new mongoose.Schema({
    packet:{
        type:String,
        enum:['Lite', 'Base', 'Max', 'Full']
    },
    expires:Date,
    payment:{
        type:String,
        enum:['Annual', 'Monthly'],
    },
    active:{
        type:Boolean,
        default:active
    }
});

hostingSchema.pre('save', function(next) {
    const date = moment();

    date.add(1, years);

    const newDate = date.format('MM-DD-YYYY');

    this.expires = newDate;

    next();
})

const Hosting = mongoose.model('Hosting', hostingSchema);
module.exports = Hosting;