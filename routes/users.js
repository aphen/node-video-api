const express = require("express");
const request = require('request');
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = "qwert";
const token = require("../utils/token");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/captcha", function (req, res, next) {
  console.dir(req.query);
  request({
    url: `http://10.81.209.31:8765/api/auth/jwt/captcha.jpg?uuid=${req.query.uuid}`,
    method: 'get',
  }).pipe(res);
  
});
router.post("/login", function (req, res, next) {
  if (req.userName === "") {
    res.json({
      status: 40002,
      errMsg: "用户名不能为空！",
    });
  } else if (req.password === "") {
    res.json({
      status: 40003,
      errMsg: "密码不能为空!",
    });
  }
  var method = req.method.toUpperCase();
  var proxy_url = "http://10.81.209.31:8765/api/auth/jwt/token";

  var options = {
    headers: { Connection: "close" },
    url: proxy_url,
    method: method,
    json: true,
    body: req.body,
  };

  function callback(error, response, data) {
    console.log(response.statusCode, data);
    if (!error && response.statusCode == 200) {
      console.log("------接口数据------", data);

      res.json(data);
    }
  }

  request(options, callback);

  // User.findOne(
  //     {
  //         username: req.body.username
  //     },
  //     function(error, result) {
  //         console.log(error, result, '?????');

  //         if(error){
  //             return next(error);
  //         }

  //         console.log(req.body.password, result.password)
  //         const isPasswordValid = require('bcryptjs').compareSync(
  //             req.body.password,
  //             result.password
  //         )

  //         if(isPasswordValid){
  //             // const token = jwt.sign({
  //             //     id: String(result._id)
  //             // },SECRET);

  //              res.json({
  //                 status: 0,
  //                 token: token.encrypt({
  //                     id: String(result._id)
  //                 }),

  //                 msg: '成功'
  //             });
  //         } else {
  //             res.json({
  //                 status: 40001,
  //                 errMsg: '用户名或密码不正确!'
  //             })
  //         }

  //     }
  // );
});
router.post("/logout", function (req, res, next) {});
module.exports = router;
