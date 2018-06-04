// Express Setup
const express = require('express');
const bodyParser = require("body-parser");
var JsonWebToken = require("jsonwebtoken");

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;



var app = express();
app.get('/authenticate',(req, res) => {
    res.json({
        message: 'Test'
    });
})
app.set("jwt-secret", "bNEPp6H70vPo01yGe5lptraU4N9v005y");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

var getBearerToken = function(header, callback) {
    if(header) {
        token = header.split(" ");
        if(token.length == 2) {
            return callback(null, token[1]);
        } else {
            return callback("Malformed bearer token", null);
        }
    } else {
        return callback("Missing authorization header", null);
    }
}

var validateToken = function(request, response, next) {
    getBearerToken(request.headers["authorization"], function(error, token) {
        if(error) {
            return response.status(401).send({ "success": false, "message": error });
        }
        JsonWebToken.verify(token, app.get("jwt-secret"), function(error, decodedToken) {
            if(error) {
                return response.status(401).send({ "success": false, "error": "Invalid authorization token" });
            }
            if(decodedToken.authorized) {
                request.decodedToken = decodedToken;
                next();
            } else {
                return response.status(401).send({ "success": false, "error": "2FA is required" });
            }
        });
    });
};
//login
app.post("/authenticate", function(request, response) {
    var user = {
        "username": "user",
        "password": "password",
        "2fa": true
    };
    if(!request.body.username) {
        return response.status(401).send({ "success": false, "message": "A `username` is required"});
    } else if(!request.body.password) {
        return response.status(401).send({ "success": false, "message": "A `password` is required"});
    }
    Bcrypt.compare(request.body.password, user.password, function(error, result) {
        if(error || !result) {
            return response.status(401).send({ "success": false, "message": "Invalid username and password" });
        }
        var token = JsonWebToken.sign({ "username": user.username, "authorized": !user["2fa"] }, app.get("jwt-secret"), {});
        response.send({ "token": token, "2fa": user["2fa"] });
    });
});

app.post("/verify-totp", function(request, response) {
    var user = {
        "username": "user",
        "password": "password",
        "totpsecret": "2MXGP5X3FVUEK6W4UB2PPODSP2GKYWUT"
    };
    getBearerToken(request.headers["authorization"], function(error, token) {
        if(error) {
            return response.status(401).send({ "success": false, "message": error });
        }
        if(!request.body.otp) {
            return response.status(401).send({ "success": false, "message": "An `otp` is required"});
        }
        JsonWebToken.verify(token, app.get("jwt-secret"), function(error, decodedToken) {
            if(TwoFactor.verifyToken(user.totpsecret, request.body.otp)) {
                decodedToken.authorized = true;
                var token = JsonWebToken.sign(decodedToken, app.get("jwt-secret"), {});
                return response.send({ "token": token });
            } else {
                return response.status(401).send({ "success": false, "message": "Invalid one-time password" });
            }
        });
    });
});


app.get("/protected", validateToken, function(request, response) {
    response.send({ "message": "Welcome to the protected page" });
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
