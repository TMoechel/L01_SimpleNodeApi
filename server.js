// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

var PersonList = [ {
    "ID" : 1,
    "FirstName" : "John",
    "LastName" : "Miller",
    "Age" : 34
}];

//HTTP Verbs GET, POST (Insert), PUT (Update), DELETE

// app.get('/', function(req,res) {
//     res.sendFile(__dirname + '/index.html', function(err){
//         if (err) {
//             res.status(500).send(err);
//         }
//     })
// });

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

app.get('/personList', function(req,res){
    res.json(PersonList);
})

var port = 3000;

app.listen(port);

console.log('node server is running on port 3000');