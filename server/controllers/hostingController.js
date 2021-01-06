const Hosting = require('../models/Hosting');
const Client = require('../models/Client');



exports.index = async (req, res) => {
    try {
        const hostings = Hosting.find();

        res.status(200).json({
            count: hostings.length,
            data:{
                hostings
            }
        })
    } catch (error) {
        res.status(404).json({ error:error.toString() })        
    }
}

exports.show = async (req, res) => {
    try{
        const hosting = Hosting.findById(req.params.id);

        res.status(200).json({ data:{ hosting } })
    } catch (error) {
        res.status(404).json({ error:error.toString() });
    }
}  

exports.create = async (req, res ) => {
    try{
        const newHosting = Hosting.create(req.body);

        const client = Client.findById(req.body.clientId);

        client.hostings.push(newHosting);

        await client.save();

        res.status(200).json({ data: { newHosting } });
    } catch ( error ) {
        res.status(400).json({ error:error.toString() });
    }
}

exports.update = async (req, res) => {
    try {
        const hosting = await Hosting.findOneAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        res.status(200).json({ data:{ hosting } });
    } catch (error) {
        res.status(400).json({ error:error.toString() });
    }
}

exports.delete = async (req, res) => {
    try{
        await Hosting.findByIdAndDelete(req.params.id);

        res.status(203).json({ data:null });
    } catch( error ) {
        res.status(404).json({ error:error.toString() });
    }
}