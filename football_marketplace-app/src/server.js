const db = require('./js/dbqueries');
const connector = db.connectV();
// connector.then(function(){
//     db.newPlayer('testname', '0xf0305365B2941eB9b4639AaC7DCEeEe6D091827D');
// });

var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

app.use(express.static(__dirname));
app.listen('3300', function () {
    console.log('CORS-enabled web server listening on port 3300')
});

app.get('/registeruser', function(req, res){
    console.log(req.query.username);
    console.log(req.query.address);
     db.newPlayer(req.query.username, req.query.address);
     res.send("Success");
});
app.get('/deleteuser', function(req, res){
    console.log(req.query.address);
    db.deletePlayer(req.query.address);
    res.send("Success");
});

app.get('/requestRegisterService', function(req, res){
    console.log(req.query.address);
    db.dbRequestRegisterService(req.query.address, req.query.name, req.query.description);
    res.send("Success");
});