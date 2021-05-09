/*
 * @Descripttion: token解密与加密
 */
const jwt = require('jsonwebtoken');

let encrypt = (data, time=3600) => {
  /**
   * @name: 加密函数
   * @param {
   *    *data:  要加密的数据
   *    *time:  过期的时间
   * }
   * @return {*token：加密信息}
   */

  return jwt.sign(data, 'qwert', { expiresIn: time });
}


let decrypt = (token) => {
  /**
   * @name: 解密函数
   * @param {*token:  要解密的token}
   * @return {
   *    *id:  用户id，便于其他接口使用
   *    *token: 用于作为判断token是否过期或者有效的标识
   * }
   */

  try {
    let data = jwt.verify(token, 'qwert');
    return {
      id: data._id,
      token: true
    }
  } catch (err) {
    return {
      id: err,
      token: false
    }
  }
}

module.exports = {
  encrypt,
  decrypt
}