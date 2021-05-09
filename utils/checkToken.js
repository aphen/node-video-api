const jwt = require('jsonwebtoken');
const User = require('../models/user');
let tokenYZ = async (req, res, next) => {
    const token = String(req.headers.authorization || " ").split(' ').pop()
    if (!token) {
        res.status(401).send("token不能为空")
        return
    }
    //app.get('secret')
    let con = await jwt.verify(token, 'qwert');

    try {
        return {
          id: con._id,
          token: true
        }
      } catch (err) {
        if (err.name == 'TokenExpiredError') {//token过期
            let str = {
                iat: 1,
                exp: 0,
                msg: 'token过期'
            }
            return str;
        } else if (err.name == 'JsonWebTokenError') {//无效的token
            let str = {
                iat: 1,
                exp: 0,
                msg: '无效的token'
            }
            return str;
        }
      }
    // jwt.verify(token, app.get('secret'), (err, decoded) => {
    //     if (err) {
    //         console.log(err);
    //         if (err.name == 'TokenExpiredError') {//token过期
    //             let str = {
    //                 iat: 1,
    //                 exp: 0,
    //                 msg: 'token过期'
    //             }
    //             return str;
    //         } else if (err.name == 'JsonWebTokenError') {//无效的token
    //             let str = {
    //                 iat: 1,
    //                 exp: 0,
    //                 msg: '无效的token'
    //             }
    //             return str;
    //         }
    //     } else {
    //         return decoded;
    //     }
    // })


    console.log(con);
    if (con.iat < con.exp) {//开始时间小于结束时间，代表token还有效
        const { id } = con    //token解码后是否存在id，此id在生成token时已定义好
        if (!id) {
            res.status(401).send("token无效")
            return
        }

        req.user = await User.findById(id)  //通过id在用户数据库查找是否有改用户，然后将请求的结果挂载到req上

        if (!req.user) {
            res.status(401).send("该用户不存在")
            return
        }

        await next();
    } else {
        res.status(401).send(con.msg)
        return;
    }
}