var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var data,data2,data3;

/* GET home page. */
router.get('/', function(req, res, next) {
    var dbref = firebase.database().ref("university");
    var dbref2 = firebase.database().ref("college");
    var dbref3 = firebase.database().ref("school");
 
    dbref.orderByChild("STAT").equalTo("done").once("value").then(function(snapshot) {
      data = snapshot.val();
      dbref3.orderByChild("STAT").equalTo("done").once("value").then(function(snapshot) {
        data3 = snapshot.val();
        dbref2.orderByChild("STAT").equalTo("done").once("value").then(function(snapshot) {
          data2 = snapshot.val();
          res.render('public/index', { 
            serviceh1: 'TEST IT',
            title : 'ihuntbest',
            university : data,
            college : data2,
            school : data3
            });
           console.log(data);
         }, function (error) {
           console.log("Error: " + error.code);
         });
  
      }, function (error) {
        console.log("Error: " + error.code);
      });
    }, function (error) {
      console.log("Error: " + error.code);
    });
});

module.exports = router;
