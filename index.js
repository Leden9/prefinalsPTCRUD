const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());

const dataFilePath = 'users.json';

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
      console.log(data);
      res.end(data); // you can also use res.send()
  });
})

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("REST API demo app listening at http://%s:%s", host, port)
})

//Step 1: Create a new user variable
var user = {

  "user2": {
      "id": 2,
      "CompanyName": "One Direction",
      "Employees": [
        "Louis",
        "Niall",
        "Liam",
        "Zayn",
        "Harry"
      ],
      "Positions": [
        "CEO",
        "President",
        "Vice-President",
        "Secretary",
        "Assistant Secretary"
      ],
      "Location": "New York"
    },
} 

//The addUser endpoint
app.post('/addUsers', function(req, res){
  //Step 2: read existing users
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
      data = JSON.parse(data);
      //Step 3: append user variable to list
      data["user2"] = user["user2"];
      console.log(data);
      res.end(JSON.stringify(data));
  });
})

//Endpoint to get a single user by id
app.get('/:id', function (req, res) {
  // First retrieve existing user list
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );
     var user = users["user" + req.params.id] 
     console.log( user );
     res.end( JSON.stringify(user));
  });
})

app.delete('/deleteUsers/:id', function (req, res) {
  // First retrieve existing users
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     delete data["user" + req.params.id];
     console.log( data );
     res.end( JSON.stringify(data));
  });

  var change_userdata = {

    "id": 3,
      "CompanyName": "Fifth Harmony1",
      "Employees": [
        "Ally1",
        "Normani1",
        "Dinah Jane1",
        "Camila1",
        "Lauren1"
      ],
      "Positions": [
        "CEO1",
        "President1",
        "Vice-President1",
        "Secretary1",
        "Assistant Secretary1"
      ],
      "Location": "New York"
    } 
  
  
  app.put('/updateUser/:id', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
      data = JSON.parse(data);
      var id = "user" + req.params.id;
      if(data[id]){
        data[id] = change_userdata.id;
        data[id] = req.body.id;
        data[id].CompanyName = change_userdata.CompanyName;
        data[id].Employees = change_userdata.Employees;
        data[id].Positions = change_userdata.Positions;
        data[id].Location = change_userdata.Location;
  
        
        console.log(data);
  
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function(err){
          if(err){
            console.log(err);
            res.send("Encountered an error while updating user info!");
          }else{
            console.log("User info successfully updated!");
            res.send(data[id]);
          }
        });
      }else{
        res.send("User not found");
      }
    });
  });
    });

