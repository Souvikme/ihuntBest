var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var shortid = require('shortid');
var modules = require('../models/searchMails.js');
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
        user: req.session.email+" "+req.session.uuid,
        value: req.session.email
      });
  }else{
    res.redirect('../../authorg/signup');
  }
});
router.post('/authorg/signup',function(req,res,next){
      var email = req.body.email;
      var uuid = shortid.generate();
      req.session.email = req.body.email;
      req.session.uuid = uuid;
      var dbref = firebase.database().ref("organizationRegTemp");
      var data;
        dbref.orderByChild("EMAIL").equalTo(email).once("value").then(function(snapshot) {
            console.log(snapshot.exists());
            data = snapshot.exists();
            if(data === true){
              req.flash('success','true');
              req.flash('msg',email+' IT IS ALREADY PRESENT');
              res.redirect('/auth/authorg/signup');
            }else{
      
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.password, salt, function(err, hash) {
                dbref.push({
                    EMAIL:email,
                    PASSWORD:hash,
                    PROCESS:"incomplete",
                    TIMESTAMP: Date.now(),
                    UUID : uuid 
                });
              });
            });
        
            if(req.session.email){
              res.redirect('/auth/authorg/setup/profile');
            }else {
              res.redirect('auth/authorg/signup');
            }
            console.log(email+" "+passwod);
          }
      });
    console.log(data);
      
});
router.post('/authorg/setup/profile',function(req,res,next){
    var uuid = req.session.uuid;
    var fullname = req.body.full_name;
    var name = req.body.name;
    var about = req.body.about;
    var address = req.body.address;
    var estd = req.body.estd;
    var phone = req.body.phone;
    var country = req.body.country;
    var email = req.body.email;
    var place = req.body.place;
    var state = req.body.state;
    var choose = req.body.choose;
    var regno = req.body.regno;

    var dbref = firebase.database().ref(choose).child(uuid).child("PROFILE");
    dbref.set({

                  ABOUT : about,
                  EMAIL : email,
                  ESTD : estd,
                  FULL_NAME : fullname,
                  NAME :  name,
                  ADDRESS : address,
                  PHONE : phone,
                  REGNO : regno
    });

    var dbref2 = firebase.database().ref(choose).child(uuid).child("LOCATION");
    dbref2.set({
                  COUNTRY : country,
                  PLACE : place,
                  STATE : state
    });

    //IHUNT REG NO 
    var temp1 = name.replace(/\s/g, "");
    var temp3="";
    switch(choose){
        case "university" :
                            temp3 = "UV";
                          break;
        case "school"     :
                            temp3 = "SC";
                          break;
        case "college"    :
                            temp3 = "CG";
                          break;
        case "institute"  :
                            temp3 = "INS";
                          break;
    }
    var temp2 = temp1+Date()+regno+temp3;
    var dbref3 = firebase.database().ref(choose).child(uuid);
    dbref3.set({
        STAT : "incomplete",
        UV_ID : temp2
    });

    res.redirect("../../../");
});


module.exports = router;
