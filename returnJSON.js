const express = require('express');
let server = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'is#S-iLva0Pe',
    port: '3306',
    database: '20170524',
});
//var multer = require('multer');
server.listen(8888);
connection.connect();

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
// server.use('/name', (req, res) => {
//     //res.header("Access-Control-Allow-Origin", "*");
//     console.log(req.body);

// });


server.use('/select/all', function(req, res) {
    var name ="'"+ req.body.username+"'";
    console.log("name:"+name);
    //var sql = 'SELECT * FROM user_table';
    var sql='SELECT * from user_table WHERE username='+name;
    //接到了请求之后 按条件查询
    //console.log("all:"+req.body);
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json({
            datas:result
        });
       
    });


});