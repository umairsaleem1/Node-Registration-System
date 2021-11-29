const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next)=>{
    const token = req.cookies.accessToken;
    if(token){
        const user = await jwt.verify(token, process.env.TOKEN_SECRET);
        if(!user){
            return res.status(401).send('Token is invalid');
        }

        //fetch user data from database
        const userData = await User.findOne({_id:user._id}).select('-email -phone -age -password -gender -__v -_id');
        if(!userData){
            return res.status(403).send('Data could not be found');
        }
        req.userData = userData;
        next();
    }else{
        return res.status(401).send('Request is un authorized');
    }
}

module.exports = auth;