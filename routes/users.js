const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
    if(req.userName === ''){
        res.json({
            status: 40002,
            errMsg: '用户名不能为空！'
        });
    } else if(req.password === '') {
        res.json({
            status: 40003,
            errMsg: '密码不能为空!'
        })
    }
    User.findOne(
        {
            userName: req.body.userName
        }, 
        function(error, result) {
            console.log(result);
            if(error){
                return next(error);
            }
            if(result.password === req.body.password){
                 res.json({
                    status: 0,
                    msg: '成功'
                });
            } else {
                res.json({
                    status: 40001,
                    errMsg: '用户名或密码不正确!'
                })
            }
           
        }
    );
    console.log(req.body);
});
module.exports = router;
