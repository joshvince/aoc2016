var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var s = require('../day5/solution.js')

describe('Day Five', function() {
  describe('#solvePartOne', function() {
    it('should solve the test input', function(done) {
      var input = 'abc'
      var res = s.solvePartOne(input)
      expect(res).to.equal('18f47a30');
    });
  });
});
