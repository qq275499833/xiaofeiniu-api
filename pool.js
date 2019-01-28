//创建mysql数据库连接池
const mysql=require('mysql');

var pool=mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'',
  database:'xiaofeiniu',
  connectionLimit:20
});
//将来要被其他模块使用
module.exports=pool;

