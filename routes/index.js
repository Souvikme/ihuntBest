var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var data,data2,data3;

/* GET home page. */
router.get('/', function(req, res, next) {
    var dbref = firebase.database().ref("university");
    var dbref2 = firebase.database().ref("college");
    var dbref3 = firebase.database().ref("school");
    dbref3.on("value", function(snapshot) {
      data3 = snapshot.val();

    }, function (error) {
      console.log("Error: " + error.code);
    });
    dbref.on("value", function(snapshot) {
      data = snapshot.val();

    }, function (error) {
      console.log("Error: " + error.code);
    });
   dbref2.on("value", function(snapshot) {
     data2 = snapshot.val();

    }, function (error) {
      console.log("Error: " + error.code);
    });
   res.render('public/index', { 
    serviceh1: 'TEST IT',
    title : 'ihuntbest',
    university : data,
    college : data2,
    school : data3
    });
   console.log(data);
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
