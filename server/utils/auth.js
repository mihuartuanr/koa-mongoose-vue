const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

const AUTHORIZATION = 'Authorization';
const expiresIn = '2h';

module.exports = {
  sign: function(payload) {
    const token = jwt.sign(payload, secret, {
      expiresIn
    });

    return token;
  },
  vertify: function(ctx, decodeToken, token){
    let result = true;
    try{
      jwt.verify(token, secret);
      result = false;
    }catch(e) {

    }
    return result;
  }
}
