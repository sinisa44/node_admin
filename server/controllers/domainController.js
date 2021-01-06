const Domain = require('../models/Domain');
const Client = require('../models/Client')

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

        res.status(200).json({
            data:{
                newDomain
            }
        })
    } catch (error) {
        res.status(400).json({ error:error.toString() })
    }
}

exports.update = (req,res) => {
    
}

exports.delete = (req, res) => {

}