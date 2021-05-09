const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = 'qwert';
const token = require('../utils/token');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
    console.log(req.body);
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
            username: req.body.username
        }, 
        function(error, result) {
            console.log(result);

            if(error){
                return next(error);
            }

            const isPasswordValid = require('bcryptjs').compareSync(
                req.body.password,
                result.password
            )

            if(isPasswordValid){
                // const token = jwt.sign({
                //     id: String(result._id)
                // },SECRET);

                 res.json({
                    status: 0,
                    token: token.encrypt({
                        id: String(result._id)
                    }),
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
