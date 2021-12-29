var express = require('express');
var app = express();


var name = process.env.NAME || "Abd"
var city = process.env.CITY || "Casa"
app.get('/', function (req, res) {
  res.send('Hello World Guys!');
});


app.get('/abdelali' , function(req , res){
    res.send("Hello abdelali")
})

app.get('/name', function(req, res){
  res.send(`My name is ${name}`)
})

app.get('/city' , function(req, res){
  res.send(`My city is ${city}`)
})
app.listen(8000, function () {
  console.log('Listening to Port 8000');
});