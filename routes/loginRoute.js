const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// getting login page
router.get('/login', (req, res)=>{
    res.render('login');
});


// handling login form data
router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isMatched){
            return res.status(401).send('Invalid Credentials');
        }
        const accessToken = await jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);

        res.cookie('accessToken', accessToken, {httpOnly:true, expires:new Date(Date.now()+(60000*60*24))});
        res.status(200).render('home');
    }catch(e){
        res.status(403).send(e);
    }
});


module.exports = router;