/**
 * 菜品相关路由
 */

const express=require("express");
const router=express.Router();
const pool=require("../../pool");

/**
 * API: GET  /admin/dish
 * 获取所有的菜品（按类别进行分类）
 * 返回数据：
 * [
 *    {cid:1,cname:'肉类'，dishList:[{},{},...]},
 *    {cid:1,cname:'菜类'，dishList:[{},{},...]}......
 * ]
 */

 router.get('/',(req,res)=>{
   //查询所有的菜品类别
   sql="SELECT cid,cname FROM xfn_category"
   pool.query(sql,(err,result)=>{
    if (err) throw err;
    var categoryList=result;  //菜品类别

    var count=0
    for(var c of categoryList){
      //循环查找每个类别下有哪些菜品
      pool.query("SELECT * FROM xfn_dish WHERE categoryId=?",c.cid,(err,result)=>{
        c.dishList=result;
        count++
        if(count==categoryList.length){
          res.send(categoryList)
        }
      })
    }

   })
 })








router.get("/",(req,res)=>{
  var sql="SELECT title,imgUrl,price,detail,categoryId FROM xfn_dish WHERE did"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result); 
  })
})


module.exports=router;


