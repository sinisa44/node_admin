const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect( process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(()=> { console.log(' Database connection successfull') })
.catch( error => console.log(error))

const port = process.env.PORT || 5000;

app.listen( port, () => { console.log(`App running on port ${port}`) });

