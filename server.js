// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override')
var _ = require('lodash');

var KeyId = 2;

var PersonList = [ {
    "ID" : 1,
    "FirstName" : "John",
    "LastName" : "Miller",
    "Age" : 34
},
{
    "ID" : 2,
    "FirstName" : "Mike",
    "LastName" : "Krüger",
    "Age" : 39
}];

//HTTP Verbs GET, POST (Insert), PUT (Update), DELETE
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

// ** Get complete list
//GET request http://localhost:3000/personList
app.get('/personList', function(req,res){
    res.json(PersonList);
});

// ** Get one element
//GET request http://localhost:3000/personList/3
app.get('/personList/:id', function(req,res){
    var person = PersonList.filter(t=> t.ID == parseInt(req.params.id));
    res.json(person);
});

// ** save one element
//POST request http://localhost:3000/personList
app.post('/personList', function(req,res){
    var person = req.body;
    KeyId = KeyId + 1;
    person.ID = KeyId;
    console.log(person);
    PersonList.push(person);
    res.json(person);n
});

//PUT request http://localhost:3000/personList/3
app.put('/personList/:id', function(req, res) {
    var newPerson = req.body;
    var personIndex = _.findIndex(PersonList, {ID: parseInt(req.params.id)});
    var personToUpdate = PersonList[personIndex];
    if (!personToUpdate) {
        res.send()
    }
    else{
        var updatedPerson = _.assign(personToUpdate, newPerson);
        res.json(updatedPerson);
    }
});

//DELETE request http://localhost:3000/personList/3
app.delete('/personList/:id', function(req, res) {
        var personToDelete = PersonList.filter(t=> t.ID == req.params.id);
        // get index of object
        const index = PersonList.findIndex(p => p === personToDelete);
        PersonList.splice(index, 1)
    //update person 
});


//POST request http://localhost:3000/personList
app.post('/personList', function(req,res){
    var person = req.body;
    console.log(person);
    PersonList.push(person);
    res.json(person);
})

var port = 3000;

app.listen(port);

console.log('node server is running on port 3000');