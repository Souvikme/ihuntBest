var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource',{
    title : "Login"
  });
});
router.get('/authorg/login',function(req,res,next){
  res.render('auth/organization/login',{
    title : "Login"
  });
});

router.get('/authorg/signup',function(req,res,next){
res.render('auth/organization/signup',{
    title : "Organization signup"
  });
});

router.get('/authorg/setup/profile',function(req,res,next){
res.render('auth/organization/profileSetup',{
    title : "Organization profile setup"
  });
});
module.exports = router;
