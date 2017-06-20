const express = require('express');
let server = express();
const bodyParser = require('body-parser');
//var multer = require('multer');
server.listen(8888);


//req.query    GET
//req.body     POST

server.all('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());

server.use('/', (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    res.end();
});
server.use('/name', (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    res.jsonp({ user: 'tobi' })
});