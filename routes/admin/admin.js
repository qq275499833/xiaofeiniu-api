/**
 * 管理员相关的路由
 */

const express = require("express");
const router = express.Router();
const pool = require("../../pool");

/**
 * 登录
 * API: GET /admin/login/:aname/:apwd
 * 完成登录验证（提示：有的项目中此处会选择POST请求）
 * 请求数据： {aname:'xxx',apwd:'xxx'}
 * 返回数据： {code:200,msg:'login succ'}
 * {code:400,msg:'aname or apwd err'}
 */
router.get("/login/:aname/:apwd", (req, res) => {
  var aname = req.params.aname
  var apwd = req.params.apwd
  console.log(aname + "----" + apwd)

  //需要对用户输入的密码进行加密验证 PASSWORD
  var sql = "SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)"
  pool.query(sql, [aname, apwd], (err, result) => {
    if (err) throw err;
    //console.log(result)

    if (result.length > 0) {   //查询到一行数据，登陆成功
      res.send({ code: 200, msg: 'login succ' })
    } else {    //没查询到数据
      res.send({ code: 400, msg: 'aname or apwd err' })
    }
  })

})



/**
 * 修改密码
 * API: PATCH  /admin
 * 请求数据：{aname:'xxx',oldPwd:'xxx',newPwd:'xxx'}
 * 返回数据： {code:200,msg:'modified succ'}
* {code:400,msg:'aname or apwd err'}
* {code:401,msg:'apwd not modified'}
 */

router.patch('/', (req, res) => {
  var data = req.body;
  //console.log(data)
  //首先根据aname/oldPwd 查询该用户是否存在
  //如果查询到了用户，再修改其密码

  sql1 = "SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)"
  pool.query(sql1, [data.aname, data.oldPwd], (err, result) => {
    if (err) throw err
    if (result.length == 0) {
      res.send({ code: 400, msg: 'password err' })
      return;
    }

    var sql2 = "UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?"
    pool.query(sql2, [data.newPwd, data.aname], (err, result) => {
      if (err) throw err;
      if (result.changeRows > 0) {  //密码修改完成
        res.send({ code: 200, msg: 'modified succ' })
      } else {  //新旧密码一样，未做修改
        res.send({ code: 401, msg: 'apwd not modified' })
      }
    })

  })
})




module.exports = router;