var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var s = require('../day8/solution.js')

describe('Day Four', function() {
  var testInput = "rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1";
  describe('#solvePartOne', function() {
    it('should solve the example input', function() {
      var res = s.solvePartOne(testInput)
      // var log = res.map(arr => { return `\n${arr}`})
      // console.log(`${log}`);
      expect(res).to.equal(6)
    });
  });
});
