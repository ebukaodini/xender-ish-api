let aes256 = require('aes256');

function success(res, message = 'success', data = {}, code = 200) {
  res.status(code);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    status: true,
    message: message,
    data: data
  }));
}

function error(res, message = 'success', data = {}, code = 200) {
  res.status(code);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    status: false,
    message: message,
    data: data
  }));
}

/**
 * method to generate token
 */
function generateToken() {
  let token = ""; count = 0;
  while (count < 6) {
    token += Math.floor(Math.random() * 9 + 1).toString();
    count++;
  }
  return token;
}

/**
 * a method to generate random passwords
 * @returns {string} generated password
 */
function generatePassword() {
  let keys = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  let password = ""; count = 0;
  while (count < 8) {
    password += keys[Math.floor(Math.random() * (keys.length - 1) + 1)];
    count++;
  }
  return password;
}

function encrypt(plaintext) {
  return aes256.encrypt(process.env.AES256_SECRETKEY, plaintext).toString();
}

function decrypt(cipher) {
  return aes256.decrypt(process.env.AES256_SECRETKEY, cipher);
}

module.exports = { success, error, generateToken, generatePassword, encrypt, decrypt }