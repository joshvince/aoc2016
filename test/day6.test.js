var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var s = require('../day6/solution.js')

describe('Day Six', function(){
  var testInput = 'eedadn\ndrvtee\neandsr\nraavrd\natevrs\ntsrnev\nsdttsa\nrasrtv\nnssdts\nntnada\nsvetve\ntesnvt\nvntsnd\nvrdear\ndvrsen\nenarar'
  describe('#solvePartOne()', function(){
    it('should solve the test input', function(){
      var res = s.solvePartOne(testInput)
      expect(res).to.equal('easter')
    });
  });
  describe('#solvePartTwo()', function(){
    it('should solve the test input given the new methodology', function() {
      var res = s.solvePartTwo(testInput)
      expect(res).to.equal('advent')
    });  
  });
});