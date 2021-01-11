const Log = require('../models/Log' );
const User = require('../models/User');

exports.create = async(params) => {
    try {
        const log = new Log({
            type: params.type,
            name: params.name,
            objectId:params.objectId
        });

        await log.save();

        const user = await User.findById(params.userId);
        
        user.logs.push(log);

        await user.save();

        return user.logs;    

    } catch (error) {
        return error.message();
    }
    
}