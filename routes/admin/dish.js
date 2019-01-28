const express=require("express");
const router=express.Router();
const pool=require("../../pool");

router.get("/",(req,res)=>{
  var sql="SELECT title,imgUrl,price,detail,categoryId FROM xfn_dish WHERE did"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result); 
  })
})


module.exports=router;


