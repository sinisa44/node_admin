const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login =  async (req, res) => {
    
    const user = await User.findOne({ email:req.body.email });

    if(user) {

      await bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err) console.log(err);

          if(!result) {
              res.status(403).json({message:'invalid password'})
          }

          const { username, password, email } = user;

          const token = jwt.sign({ username, password, email }, process.env.TOKEN);

        
          res.status(200).json({
              data:{
                email,
                token
              }
          })
       } )
    }

   
}

exports.logout = (req, res) => {

}

exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(200).json(
            {
                data:{newUser}
            }
        )
    } catch (error) {
        res.status(400).json({ error: error.toString() });        
    }
}