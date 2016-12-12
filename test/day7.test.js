var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var solution = require('../day7/solution.js')

var exampleInput = "abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn"

describe('Day 7', function(){
  describe('#solvePartOne', function(){
    it('should solve the example input correctly', function(){
      expect(solution.solvePartOne(exampleInput)).to.equal(2)
    });
  });
});
