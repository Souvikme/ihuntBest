var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var shortid = require('shortid');
var modules = require('../models/searchMails.js');
var data1;
router.get('/',function(req,res,next){
    if(req.session.email){
      var orgid = req.session.uuid;
      var type = req.session.choose;
      var dbref = firebase.database().ref(type).child(orgid).child("COURSES");
      dbref.once("value",function(snap){
          var dataexsist = snap.exists();
          if( dataexsist === true){
            data1=snap.val();
            res.render('auth/organization/crm/dashboard',{
              courses : data1,
              pre1 : true
            });
          }else{
            res.render('auth/organization/crm/dashboard',{
              courses2 : "NO DATA PRESENT",
              pre1: false
            });
          }
      },function(error){
        console.log(error);
      });
      
    }else{
      res.redirect('auth/authorg/signup');
    }
});

router.post('/',function(req,res,next){
    var orgid = req.session.uuid;
    var type = req.session.choose;
    //var email = req.session.email;
    var name = req.body.name;
    var seat = req.body.seat;
    var fee =  req.body.fee;
    var period = req.body.period;
    var details = req.body.detail;
    var dbref = firebase.database().ref(type).child(orgid).child("COURSES");
    dbref.push({
        NAME : name,
        SEAT : seat,
        FEE : fee,
        PERIOD : period,
        DETAILS : details
    });
  res.redirect("/dashboard");
});
module.exports = router;