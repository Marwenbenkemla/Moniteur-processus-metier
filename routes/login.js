var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', session: req.session });
});

router.post('/', function(request, response, next) {
    var user_email_address = request.body.user_email_address;
    var user_password = request.body.user_password;

    if (user_email_address && user_password) {
        query = `
        SELECT * FROM user
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function(error, data) {
            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].user_password == user_password) {
                        request.session.user_id = data[count].user_id;
                        return response.redirect("/sample_data");
                    } else {
                        return response.send('Incorrect Password');
                    }
                }
            } else {
                return response.send('Incorrect Email Address');
            }
            response.end();
        });
    } else {
        return response.send('Please Enter Email Address and Password Details');
    }
});

router.get('/logout', function(request, response, next) {
    request.session.destroy();
    response.redirect("/sample_data");
});

module.exports = router;
