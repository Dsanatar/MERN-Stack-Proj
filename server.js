const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//init spotify api wrapper
const SpotifyWebApi = require('spotify-web-api-node');
const request = require('request');
const querystring = require('querystring');
require('dotenv').config();


const app = express();

//Bodyparser Middleware
app.use(express.json());


const redirect_uri = 
    process.env.REDIRECT_URI ||
    'http://localhost:3000/callback'

app.get("/login", function(req, res) {
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: "user-read-private user-read-email",
            redirect_uri
        }))
})

app.get("/callback", function(req, res) {
    let code = req.query.code || null
    let authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form : {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic' + (new Buffer (
                process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
            ).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, function(err, res, body) {
        var access_token = body.access_token
        let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
        res.redirect(uri + '?access_token=' + access_token)
    })
})
    
app.get("/search", function(req, res) {
            let query = req.query.query;

            if(req.query.context) {
                if(req.query.context == 'artist'){
                    query = 'artist:' + req.query.query;
                }
                if(req.query.context == 'track'){
                    query = 'track:' + req.query.query;
                }
            }
            spotifyApi.searchTracks(query)
                .then(function(data) {
                    res.send(data.body);
                    console.log(data.body)
                }, function(err){
                    console.log(err)
            });
        },
        function(err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
       
);


//MongoDB config
const db = process.env.mongoURI;

//Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

//Serve static assets if we are in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    
    //any request should load this page unless it is hitting the API
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));