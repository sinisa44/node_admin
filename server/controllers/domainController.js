const Domain = require('../models/Domain');
const Client = require('../models/Client');
const logController = require('./logController');


exports.index = async (req, res) => {
    try {
        const domains = await Domain.find();

        res.status(200).json({
            data:{
                domains
            }
        })
    } catch (error) {
        res.status(404).json({ error:error.toString() })
    }
}

exports.show = async (req, res) => {
    try {
        const domain = await Domain.findById(req.params.id);

        res.status(200).json({ 
            data: {
                domain
            }
        })
    } catch (error) {
        res.status(404).json({ error: error.toString()})
    }
}

exports.create = async (req, res) => {
    try{

        const newDomain =  await Domain.create(req.body);

        const client = await Client.findById(req.body.clientId)
       
        client.domains.push(newDomain);
        
        await client.save();
        
        await logController.create({ userId: req.user._id, type:'CREATE', name: 'Domain', objectId: newDomain._id });
        
        res.status(200).json({
            data:{
                newDomain
            }
        })
    } catch (error) {
        res.status(400).json({ error:error.message })
    }
}

exports.update = async (req,res) => {
    try {
        const domain = await Domain.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        });

        await logController.create({ userId: req.user._id, type: 'CREATE', name: 'Domain', objectId: req.params.id });

        res.status(200).json({ data:{ domain } });
    } catch (error) {
        res.status(404).json({ error:error.toString() });
    }
}

exports.delete = async (req, res) => {
    try{
        await Domain.findByIdAndDelete(req.params.id);
    
        await logController.create({ userId: req.user._id, type: 'UPDATE', name: 'Domain', objectId: req.params.id });

        res.status(204).json({ data:null });
    } catch (error) {
        res.status(404).json({ error:error.toString() });
    }
}