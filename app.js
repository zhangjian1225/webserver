var express = require("express");
var app = express();
var mysql = require('mysql');  
var bodyParser = require("body-parser");
//连接数据库
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'app'
})
connection.connect(function(err){
	if (err) {
		console.log("与数据库连接失败")
	}
});
app.use(bodyParser.urlencoded({ extended: true }));
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

//写个接口登录
//登录
app.post('/login',function(req,res){
	// res.status(200)
	// get方式
	// var name = req.query.username;  // 获取前端发送过来的账号
 	//  var psw = req.query.password;
 	//  post方式
 	var name = req.body.username;  // 获取前端发送过来的账号
 	var psw = req.body.password;
	var selectSQL = "select * from user where username = '"+name+"' and password = '"+psw+"'";
	connection.query(selectSQL,function(err,data) {
		console.log("454545")
	    if(err) {
	        res.json(0)
	    } else {
	    	if (data.length == 0) {
	    		res.json(1)
	    	} else {
	    		res.json(2)
	    	}
            // connection.end();
        }
    })
});
//注册
app.post('/sgin',function(req,res){
	var name = req.body.username;  // 获取前端发送过来的账号
 	var psw = req.body.password;
 	var usr={
 		username : name,
 		password : psw
 	}
 	var getUser = "select * from user where username = '"+name+"'";
 	var isHave = true;
 	connection.query(getUser,function(err,data) {
	    if(err) {
	        res.json(0)
	    } else {
	    	if (data.length == 0) {
	    		isHave = false
	    	} else {
	    		isHave = true
	    		res.json(1)
	    	}
	    	if(!isHave){
		    	connection.query('insert into user set ?', usr, function(errs,datas) {
			 		if(errs) {
				        res.json(0)
				    } else {
				    	res.json(2)
				    	//生成对应表
				    	// console.log(name)
				    	// var createTable = "create table"+name+"(data varchar(255),userId varchar(255),person varchar(255),money varchar(255)),kg varchar(255),sendPrice varchar(255),getPrice varchar(255),isGive varchar(255))"
				    	// // +
				    	// connection.query(createTable,function(errss,result) {
				    	// 	if(errss) {
						   //      console.log(errss)
						   //  } else {
						   //  	console.log("成功")
						   //  }
				    	// })
			           // connection.end();
			        }
			    })
		    }
            // connection.end();
        }
    })
})
//收款list
app.post('/getList',function(req,res){
	var name = req.body.username;
	var sql = "select * from user where username = '"+name+"'";
	connection.query(sql,function(err,data) {
		if (err) {
			alert()
		} else{
			res.json(data)
		}
	})
})
app.post('/setList',function(req,res){
	var name = req.body.username;
	var data = req.body.data;
	console.log(data)
	var sql = "update user set list ='"+data+"' where username = '"+name+"'";
	connection.query(sql,function(err,data) {
		if (err) {
			alert("未添加成功")
		} else{
			res.json(data)
		}
	})
})

//配置服务端口
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
})