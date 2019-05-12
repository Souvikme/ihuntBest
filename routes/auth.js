var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/authorg/login',function(req,res,next){
  res.render('auth/organization/login');
});

router.get('/authorg/signup',function(req,res,next){
res.render('auth/organization/signup');
});

router.get('/authorg/setup/profile',function(req,res,next){
res.render('auth/organization/profileSetup');
});
module.exports = router;
