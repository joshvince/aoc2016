var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var s = require('../day2/solution.js')

var inputString = 'ULL\nRRDDD\nLURDL\nUUUUD'
var testInput = ['U', 'L', 'L'];
var testInput2 = ['R', 'R', 'D', 'D', 'D']
var testInput3 = ['L', 'U', 'R', 'D', 'L']
var testInput4 = ['U', 'U', 'U', 'U', 'D']

describe('Part One', function () {
  
  describe('#parseInput()', function () {
    var result = s.parseInput(inputString);
    it('correctly parses the input', function () {
      expect(result).to.have.lengthOf(4)
      expect(result[0]).to.be.an('array')
      expect(result[0]).to.have.members(['U', 'L', 'L'])
    })
  })
  describe('#failsafe()', function () {
    it('catches bad right operations', function () {
      expect(s.failsafe(9,10)).to.equal(9)
      expect(s.failsafe(6,7)).to.equal(6)
      expect(s.failsafe(3,4)).to.equal(3)
    });
    it('catches bad left operations', function () {
      expect(s.failsafe(4,3)).to.equal(4)
      expect(s.failsafe(1,0)).to.equal(1)
      expect(s.failsafe(7,6)).to.equal(7)
    });
    it('catches bad up operations', function() {
      expect(s.failsafe(1,-2)).to.equal(1)
      expect(s.failsafe(2,-1)).to.equal(2)
      expect(s.failsafe(3,0)).to.equal(3)
    });
    it('catches bad down operations', function () {
      expect(s.failsafe(7,10)).to.equal(7)
      expect(s.failsafe(8,11)).to.equal(8)
      expect(s.failsafe(9,12)).to.equal(9)
    });
    it('allows good operations', function () {
      expect(s.failsafe(7,8)).to.equal(8)
      expect(s.failsafe(3,6)).to.equal(6)
    })
  });
  describe('#getOneNumber()', function () {
    it('returns the correct number from the examples', function () {
      expect(s.getOneNumber(5, testInput, s.move)).to.equal(1)
      expect(s.getOneNumber(1, testInput2, s.move)).to.equal(9)
    })
  });
  describe('#getAllNumbers()', function () {
    it('returns the correct numbers from the examples, as an array to be parsed', function () {
      var input = [testInput, testInput2, testInput3, testInput4]
      expect(s.getAllNumbers(5, input, s.move)).to.be.an('array').with.lengthOf(5)
    })
  })
});

describe('Part Two', function () {
  var keypad = s.generateKeypad();
  describe('#receiveInstruction()', function () {
    it('returns an array containing two numbers that are a valid key', function () {
      expect(s.executeOneCommand([2,0], 'D')).to.be.an('array').with.lengthOf(2)
      expect(s.executeOneCommand([2,0], 'D')).to.have.members([2,0])
      expect(s.executeOneCommand([3,3], 'U')).to.have.members([2,3])
    })
  })
  describe('#printCode()', function () {
    it('converts an array of coordinate positions into a string containing the code', function () {
      var result = s.printCode([[0,2], [1,1], [1,2]])
      expect(result).to.be.a('string')
      expect(result).to.equal('123')
    })
  });
  describe('#solvePartTwo()', function () {
    it('correctly solves the example code', function () {
      var result = s.solvePartTwo(inputString)
      console.log(result)
    })
  })
})