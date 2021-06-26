let assert = require('assert');
const { generateToken } = require('../../lib/utils');

describe('lib/utils.js', function () {
  describe('#generateToken()', function () {
    
    let freshToken = generateToken();
    
    it('should return type string', function () {
      return assert(typeof freshToken === 'string', `typeof freshtoken is ${typeof freshToken}`);
    })

    it('should have a length of 6', function () {
      return assert(freshToken.length === 6, `length of freshtoken is ${freshToken.length}`);
    });

  })
})