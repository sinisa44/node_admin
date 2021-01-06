const Client = require('../models/Client');

exports.index = async (req, res) => {
    try{
        const clients = await Client.find();

        res.status(200).json({
            count: clients.length,
            data:{
                clients
            }
        })
    } catch (error) {
        res.status(404).json({
            error:error.toString()
        })
    }
}

exports.show = async(req, res) => {
    try {
        const client = await Client.findById(req.params.id)
                                    .populate('hosting')
                                    .populate('domains');

        if(!client) {
            res.status(404)
        }

        res.status(200).json({
            data:{
                client
            }
        })
    } catch (error) {
        res.status(404).json({
            error:error.toString()
        })        
    }
}

exports.create = async(req, res) => {
    // console.log(req.body);
    try {
        const newClient = await Client.create(req.body);

        res.status(201).json({
            data:{
                newClient
            }
        })
    } catch (error) {
        res.status(400).json({
            error:error.toString()
        })        
    }
}

exports.update = async(req, res) => {
   try {
       const client = await Client.findOneAndUpdate(req.params.id, req.body, {
           new:true,
           runValidators:true
       })

       res.status(200).json({
           data:{ client }
       })
   } catch (error) {
       res.status(400).json({error:error.toString()})
   }
}

exports.delete = async(req, res) => {
    try{
        await Client.findOneAndDelete(req.params.id);
    
        res.status(204).json({
            data:null
        })
    } catch(error) {
        res.status(404).json({ error:error.toString() })
    }
}


