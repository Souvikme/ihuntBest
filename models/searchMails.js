var firebase = require('firebase');

var searchMails = {
    match: function(email )
    {
        var query;
        var dbref = firebase.database().ref("organizationRegTemp");
      

        //  dbref.orderByChild("EMAIL").equalTo(email).once("value", function(data) {
        //     data.forEach(function (childSnapshot) {
        //         //var data = childSnapshot.val();
        //          query=childSnapshot.exists();
        //          //console.log(query);
        //          return query;     
        //     });
        //  });
          
                  
    }
}

// function getArticlePromise(id) {
//     return ref.child('blogposts').child(id).once('value').then(function(snapshot) {
//       return snapshot.val();
//     });
//   }


module.exports = searchMails



