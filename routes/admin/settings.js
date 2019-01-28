const express=require("express");
const router=express.Router();
const pool=require("../../pool");


router.get("/",(req,res)=>{
 

  var sql="SELECT appName,apiUrl,adminUrl,appUrl,icp,copyright FROM xfn_settings WHERE sid";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
    //console.log(result);
  })


})

module.exports=router;
