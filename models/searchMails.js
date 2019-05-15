var firebase = require('firebase');

module.exports = function(){
    this.mailCheck = function(email )
    {
        var dbref = firebase.database().ref('organizationRegTemp');
        var query = dbref.orderByChild('email')
                    .equalTo(email)
                    .limitToFirst(1);
        query.on("value", function(snapshot) {
            data2 = snapshot.val();

            return data2

            }, function (error) {
            return error;
        });  
        return email;               
    }
}



