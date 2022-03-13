const db = require('./src/js/dbqueries');
const connector = db.connectV();


var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

app.use(express.static('src'));
app.listen('3300', function () {
    console.log('CORS-enabled web server listening on port 3300')
});
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/registeruser', function(req, res){
    console.log(req.query.username);
    console.log(req.query.address);
    db.newPlayer(req.query.username, req.query.address);
    res.send("Success");
});
app.get('/deleteuser', function(req, res){
    console.log(req.query.address +" deleting");
    db.deletePlayer(req.query.address);

    res.send("Success");
});

app.get('/requestRegisterService', function(req, res){
    console.log(req.query.address);
    db.dbRequestRegisterService(req.query.address, req.query.name, req.query.description);
    res.send("Success");
});

app.get('/submitservice', async function(req, res){
    const results = await db.getServices();
    for(let r of results){
        db.deleteServiceRequest(r['address'],r['service_name'],r['service_description']);
        db.submitService(r['address'],r['service_name'],r['service_description']);
    }
    res.send("Success");
});

app.get('/deleteservice', function(req, res){
    console.log(req.query.address +" deleting service");
    db.deleteService(req.query.address,req.query.name);

    res.send("Success");
});


app.get('/registercoach', function(req, res){
    console.log(req.query.address);
    db.registerCoach(req.query.address, req.query.username);
    res.send("Success");
});