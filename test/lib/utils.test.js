let assert = require('assert');
const { generateToken, generatePassword } = require('../../lib/utils');

describe('lib/utils.js', function () {
  describe('#generateToken()', function () {

    let token = generateToken();

    it('should return type string', function () {
      return assert(typeof token === 'string', `typeof token is ${typeof token}`);
    })

    it('should have a length of 6', function () {
      return assert(token.length === 6, `length of token is ${token.length}`);
    });

  })

  describe('#generatePassword()', function () {

    let password = generatePassword();

    it('should return type string', function () {
      assert(typeof password === 'string', `typeof password is ${typeof password}`);
    })

    it('should have a length of 8', function () {
      assert(password.length === 8, `length of password is ${password.length}`);
    });
  })
})