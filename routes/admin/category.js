/**
 * 菜品类别相关的API
 */
//创建路由器
const express = require("express");
const router = express.Router();
const pool = require("../../pool")

/**
 * API:  GET /admin/category
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值：[{cid:1,cname:'...'}.{...}]
 */

router.get("/", (req, res) => {
  var sql = "SELECT cid,cname FROM xfn_category ORDER BY cid";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

/**
 * API:  DELETE /admin/category/:cid
 * 含义：根据表示菜品编号的路由参数，删除该菜品
 * 返回值：{code:200,msg:'1 category delete'}
 * 返回值：{code:400,msg:'0 category delete'}
 */
router.delete("/:cid", (req, res) => {
  //注意：删除菜品类别前，必须把属于该类别的菜品类别编号设置为NULL
  var sql1 = "UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?"
  pool.query(sql1, req.params.cid, (err, result) => {
    if (err) throw err;
    //至此指定类别的菜品已经修改完成

    var sql = "DELETE FROM xfn_category WHERE cid=?"
    pool.query(sql, [req.params.cid], (err, result) => {
      if (err) throw err
      if (result.affectedRows > 0) {
        res.send({ code: 200, msg: '1 category delete' })
      } else {
        res.send({ code: 400, msg: '0 category delete' })
      }
    })

  })

})



/**
 * API:  POST /admin/category
 * 请求参数：{cname:'xxx'}
 * 含义：添加新的菜品类别
 * 返回值：{code:200,msg:'1 category added',cid:x}
 */
router.post("/", (req, res) => {
  //console.log("获取到请求数据")
  //console.log(req.body)
  var data = req.body;   //形如{cname:xxx,age:10}
  var sql = 'INSERT INTO xfn_category SET ?'

  pool.query(sql, data, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: '1 category added' })
  })

})



/**
 * API:  PUT /admin/category
 * 请求参数：{cid:xx,cname:'xxx'}
 * 含义：根据菜品编号修改该类别
 * 返回值：{code:200,msg:'1 category modified'}
 * 返回值：{code:400,msg:'0 category modified,not exists'}
 * 返回值：{code:401,msg:'0 category modified,no modification'}
 */
router.put('/', (req, res) => {
  var data = req.body;    //请求数据{cid:xx,cname:"xx"}
  // TODO： 此处可以对数据进行验证
  var sql = "UPDATE xfn_category SET ? WHERE cid=?"
  pool.query(sql, [data, data.cid], (err, result) => {
    if (err) throw err;
    if (result.changedRows > 0) {//实际更新一行
      res.send({ code: 200, msg: '1 category modified' })
    } else if (result.affectedRows == 0) {
      res.send({ code: 400, msg: '0 category modified,not exists' })
    } else if (result.affectedRows == 1 && result.updateRows == 0) {
      //影响到1行，但修改了0行-----新值与旧值一样
      res.send({ code: 401, msg: '0 category modified,no modification' })
    }
  })

})







module.exports = router;

