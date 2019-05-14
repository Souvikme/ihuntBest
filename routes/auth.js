var express = require('express');
var router = express.Router();
var firebase = require('firebase');
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
  if(req.session.email){
    res.render('auth/organization/profileSetup',{
        title : "Organization profile setup",
        user: req.session.email
      });
  }else{
    res.redirect('../../authorg/signup');
  }
});
router.post('/authorg/signup',function(req,res,next){
      req.session.email = req.body.email;
      var email = req.body.email;
      var passwod = req.body.password;
      var dbref = firebase.database().ref("organizationRegTemp");
      dbref.push({
          EMAIL:email,
          PASSWORD:passwod,
          PROCESS:"incomplete",
          TIMESTAMP: Date.now(),
          UUID : md5(email)
      });
      if(req.session.email){
        res.redirect('/auth/authorg/setup/profile');
      }else {
        res.redirect('auth/authorg/signup');
      }
      console.log(email+" "+passwod);
});
router.post('/authorg/signup',function(req,res,next){




});


module.exports = router;
