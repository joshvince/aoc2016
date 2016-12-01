var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;



var day1 = require('../day1/day1solution.js')

describe('Array', function(){
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Day1', function(){
  var directionObj = {
    "direction": 'U',
    "blocks": 5
  }
  var positionObj = {
    "x": 0,
    "y": 0,
    "direction": 'U'
  }
  describe('#turn()', function(){
    it('ends up facing left if currently facing up and told to turn left', function(){
      assert.equal('L', day1.turn('U', 'L'));
    });
    it('ends up facing right if currently facing up and told to turn right', function(){
      assert.equal('R', day1.turn('U', 'R'));
    });
    it('ends up facing down if currently facing left and told to turn left', function(){
      assert.equal('D', day1.turn('L', 'L'));
    });
  });
  describe('#parseInput()', function(){
    it('turns the string into an array of objects that fit the spec', function(){
      var input = 'U5, R5'
      var result = day1.parseInput(input);
      expect(result).to.be.an('array');
      expect(result).to.include(directionObj);
      expect(result[0].blocks).to.be.a('number');
      expect(result[0].direction).to.be.a('string');
    });
  });
  describe('#subtractFromAxis()', function(){
    it('updates the accumulator object by subtracting from the given axis', function(){
      var result = day1.subtractFromAxis(positionObj, 'x', 2)
      expect(result).to.have.property('x', -2)
    });
  });
  describe('#addToAxis()', function(){
    it('updates the accumulator object by adding to the given axis', function(){
      var result = day1.addToAxis(positionObj, 'y', 2)
      expect(result).to.have.property('y', 2)
    });
  });

});
