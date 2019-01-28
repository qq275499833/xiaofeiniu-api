const express=require("express");
const router=express.Router();
const pool=require("../../pool")

router.get("/",(req,res)=>{
  var sql="SELECT cid,cname FROM xfn_category";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})


module.exports=router;

