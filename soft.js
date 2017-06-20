const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mysql = require("mysql");
let connection = mysql.createConnection({
	host: '192.168.11.152',
	user: 'root',
	password: '123456',
	port: '3306',
	database: 'zjs_2017_6_19',
});

app.listen(8888);
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

// console.log("-------------:"+__dirname);
// console.log("+++++++++++++:"+path.join(__dirname, 'img'));
//app.use('/img', express.static('img/5.jpg'));
//app.use(express.static('img/5.jpg'));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/getList', (req, res) => {

	let qStr = "SELECT * FROM `recover`"

	connection.query(qStr, (e, r) => {
		res.jsonp({
			datas: r
		});
		console.log(r);
	});

});
app.use('/reg', (req, res) => {
	let name = req.body.name;
	let content = req.body.content;
	let imgSrc = req.body.imgSrc;
	let timestamp = getLogTime();
	console.log(timestamp);
	let regStr = "INSERT INTO `user` (userId,userName,regTime) VALUES ('" + generateUUID() + "','nanananana','" + timestamp + "')";
	console.log(regStr);
	connection.query(regStr, (err, result) => {
		if(err) {
			console.log("err:" + err);
			res.json({
				datas: "0"
			});
		} else {
			console.log("result:" + result);

			res.json({
				datas: "1"
			});
		}

	});
});

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return(c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

function getLogTime() {
	//小于10的时间数补零函数
	var pl = function(str) {
		if(str < 10) { //小于10 补零返回
			return "0" + str;
		} else { //不小于10 返回参数
			return str;
		}

	};
	var d = new Date();
	//返回格式化时间
	var NSString = d.getFullYear() + "-" + pl((d.getMonth() + 1)) + "-";
	NSString += pl(d.getDate()) + " " + pl(d.getHours());
	NSString += ":" + pl(d.getMinutes()) + ":" + pl(d.getSeconds());
	// NSString += ":" + d.getMilliseconds();
	return NSString;
}
app.use('/login', (req, res) => {

	let loginQueryStr = 'SELECT * FROM `user_table` WHERE username="' + req.body.name + '"';
	connection.query(loginQueryStr, (err, result) => {
		console.log("result:" + JSON.stringify(result));
		if(err) {
			res.jsonp({
				datas: "0"
			});
			return;
		}

		//查出来的结果
		//如果有就去值就对比密码 
		//如果没有就返回 1
		if(!result[0]) {
			//没有这个用户
			res.json({
				datas: "1"
			});
		} else {
			if(result[0].password == req.body.pass) {
				//正确
				res.json({
					datas: "2"
				})
			} else {
				//密码错误
				res.json({
					datas: "3"
				})
			}
		}
	});
})