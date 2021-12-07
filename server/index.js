var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World Guys!');
});


app.get('/abdelali' , function(req , res){
    res.send("Hello abdelali")
})
app.listen(8000, function () {
  console.log('Listening to Port 8000');
});