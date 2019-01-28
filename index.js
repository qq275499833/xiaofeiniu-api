/***
 * 小肥牛扫码点餐项目API
 * 
 */



const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')

/* 引入路由模块 */
const settings=require("./routes/admin/settings");
const admin=require("./routes/admin/admin");
const category=require("./routes/admin/category")
const dish=require("./routes/admin/dish");
const table=require("./routes/admin/table")


const PORT=8090;


/* 创建服务器 */
var app=express()
app.listen(PORT, ()=>{
    console.log('API服务器启动成功... '+PORT+'......')
});
//使用body-paser中间件
//app.use(bodyParser.urlencoded({extended:false}));     //把application/x-www-form-urlencoded 格式的请求主体数据解析数来

app.use(bodyParser.json());     //把json格式的请求主体数据解析出来放入req.body属性


//托管静态资源到public目录下
app.use(express.static('public'));

app.use(cors({
    origin:'*'
}))




/* 使用路由器来管理路由 */
app.use("/settings",settings);
app.use("/admin",admin);
app.use("/admin/category",category);
app.use("/dish",dish);
app.use("/table",table);



