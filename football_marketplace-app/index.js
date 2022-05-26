const db = require('./src/js/dbqueries');
const fs = require('fs');
const connector = db.connectV();

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
const port = 3300 || process.env.PORT;
app.use(express.static('src'));
app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 3300')
});

app.get('/', async function(req, res){
    res.send("basis");
});
app.get('/getAdmittedServices', async function(req, res){
    console.log(req.query.address);
    const results = await db.getAdmittedServices(req.query.address);

    res.send(results);
});

app.get('/getServiceRequests', async function(req, res){
    console.log("Request for services");
    const results = await db.getServices();
    console.table(results);
    res.send(results);
});
app.get('/getallservices', async function(req, res){
    const results = await db.getAllServices();
    res.send(results);
});

app.get('/registeruser', function(req, res){
    console.log("Registering user "+req.query.username+" with address "+req.query.address);
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
    db.dbRequestRegisterService(req.query.address, req.query.name, req.query.description, req.query.price);
    res.send("Success");
});

app.get('/admitservice', async function(req, res){
    const serviceName = req.query.name;
    const address = req.query.address;
    const description = req.query.description;


        db.deleteServiceRequest(address, serviceName);
        db.submitService(address, serviceName, description, req.query.price);

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

app.get('/getusername', async function(req, res){
    console.log(req.query.address);
    let rows = await db.getUsername(req.query.address);
    res.send(rows[0]['name']);
});
app.get('/getcontractaddress', function(req, res){
    let addy = fs.readFileSync("address.txt");
    console.log("The addy is "+addy);
    res.send(addy);
});

app.get('/buyservice', function(req, res){
    console.log(req.query.address);
    db.buyService(req.query.servicename, req.query.address);
    res.send("Success");
});

app.get('/servicedone', function(req, res){
    console.log(req.query.address);
    db.serviceDone(req.query.servicename, req.query.address);
    res.send("Success");
});

