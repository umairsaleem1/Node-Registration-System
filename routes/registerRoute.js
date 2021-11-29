const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');



// getting register page
router.get('/register', (req, res)=>{
    res.render('register');
});


// handling register form data
router.post('/register', async (req, res)=>{
    try{
        const { password, confirmpassword } = req.body;
        if(password!==confirmpassword || password.length<8){
            return res.send('Passwrod & confirm password is not same');
        }
        const user = new User(req.body)
        user.password = await bcrypt.hash(user.password, 10);
        user.confirmpassword = undefined;
        const data = await user.save();
        if(!data){
            return res.status(500).send('Internal Server Error')
        } 
        res.status(201).render('home');       
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = router;