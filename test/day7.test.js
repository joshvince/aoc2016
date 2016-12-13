var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var solution = require('../day7/solution.js')


describe('Day 7', function(){
  describe('#solvePartOne', function(){
    var exampleInput = "abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn"
    it('should solve the example input correctly', function(){
      expect(solution.solvePartOne(exampleInput)).to.equal(2)
    });
  });
  describe('#solvePartTwo', function(){
    var exampleInput = "aba[bab]xyz\nxyx[xyx]xyx\naaa[kek]eke\nzazbz[bzb]cdb"
    it('should solve the example input correctly', function(){
      var res = solution.solvePartTwo(exampleInput)
      console.log(res)
      expect(res).to.equal(3)
    });
  });
});
