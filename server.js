// Express Setup
const express = require('express');
const bodyParser = require("body-parser");
var JsonWebToken = require("jsonwebtoken");
var TwoFactor = require('node-2fa');
// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

//twilio
const dotenv = require('dotenv').load();
const accountSID = process.env.TWILIO_SID || "";
const authToken = process.env.TWILIO_TOKEN || ""; 
const twilio = require('twilio');
var client = new twilio(accountSID, authToken)

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


//32 char secret generator
app.get("/generate-secret", function(request, response) {
    response.send({ "secret": TwoFactor.generateSecret() });
});
//six character token
app.post("/generate-otp", function(request, response) {
    console.log('otp post test')
   let otp = TwoFactor.generateToken(request.body.secret);
   console.log(request.body.phoneNumber);
   console.log(otp);
    client.messages.create({
        body: otp.token,
        to: request.body.phoneNumber,  // Text this number
        from: process.env.TWILIO_NUMBER // From a valid Twilio number
     })
     .then((message) => console.log(message.sid));
    response.send({otp});
});

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
//middleware funtion that either validates our token and progresses us into the endpoint or 
//return an error on our behalf. 
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
/*The validateToken function above does a few things. First, we expect that the token is passed 
around as a Bearer token in an authorization header. If the header exists, we split the
 token and use the second half. Using the JWT secret we can verify the token to see if it is legit
 and the user is truly authorized to access the API. If the token is valid, we can add it to the 
 request and progress from the middleware to our protected endpoint. At this point the protected 
 endpoint will have access to the decoded value set in the middleware. This middleware can be used
 on every protected endpoint.*/


/*login (trades auth data for JSON Web Token) assumes database data has a boolean element 2fa that 
indicates if 2fa is enabled or not (probably uneccasary for our purposes wil defalut to on.)*/
app.post("/authenticate", function(request, response) {
   //static databaseless user info
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
    //bcrypt password hash for protection
    Bcrypt.compare(request.body.password, user.password, function(error, result) {
        if(error || !result) {
            return response.status(401).send({ "success": false, "message": "Invalid username and password" });
        }
        var token = JsonWebToken.sign({ "username": user.username, "authorized": !user["2fa"] }, app.get("jwt-secret"), {});
        response.send({ "token": token, "2fa": user["2fa"] });
    });
});
//atuhenticates token, assumes mock user and mock data including a otp (totp) secret. 
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
                //verifies otp and updates authorized
                decodedToken.authorized = true;
                var token = JsonWebToken.sign(decodedToken, app.get("jwt-secret"), {});
                return response.send({ "token": token });
            } else {
                return response.status(401).send({ "success": false, "message": "Invalid one-time password" });
            }
        });
    });
});

//JWT should be used wwith every future request to a protected API endpoint
app.get("/protected", validateToken, function(request, response) {
    response.send({ "message": "Welcome to the protected page" });
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
