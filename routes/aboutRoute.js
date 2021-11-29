const router = require('express').Router();
const auth = require('../middlewares/auth');


router.get('/about', auth, (req, res)=>{
    res.render('about', {username:req.userData.fname+' '+req.userData.lname});
});

module.exports = router;