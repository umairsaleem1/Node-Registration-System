const router = require('express').Router();
const auth = require('../middlewares/auth');

router.get('/logout', auth, async (req, res)=>{
    try{
        res.clearCookie('accessToken');
        res.render('login');
    }catch(e){
        console.log('er');
        res.status(500).send(e);
    }
});

module.exports = router;