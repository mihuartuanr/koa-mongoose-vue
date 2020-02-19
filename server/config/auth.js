const AES = require("crypto-js/aes");
const secretText = 'jwt.secret.text';
const key = 'jwt.secret.key'
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(originalText); // 'my message'
module.exports = {
  secret: AES.encrypt(secretText, key).toString(),
  authKey: 'auth'
}
