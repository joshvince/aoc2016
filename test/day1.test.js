var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var day1 = require('../day1/solution.js')

/*
TODO:
Declutter this. 
It's incredibly verbose as I am using this day as a learning excercise about what chai and mocha can do
*/

describe('Day1Part1', function(){
  describe('#turn()', function(){
    var position = {
      "x": 0,
      "y": 0,
      "direction": 'U'
    };
    it('handles successive commands correctly', function(){
     day1.turn({"direction": 'R'}, position);
     day1.turn({"direction": 'R'}, position);
     expect(position).to.have.property('direction', 'D')
    });
  });
  describe('#parseInput()', function(){
    it('turns the string into an array of objects that fit the spec', function(){
      var input = 'U5, R5'
        var directionObj = {
          "direction": 'U',
          "blocks": 5
        }
      var result = day1.parseInput(input);
      expect(result).to.be.an('array');
      expect(result).to.include(directionObj);
      expect(result[0].blocks).to.be.a('number');
      expect(result[0].direction).to.be.a('string');
    });
  });
  describe('#subtractFromAxis()', function(){
    var positionObj = {
      "x": 0,
      "y": 0,
      "direction": 'U'
    }
    it('updates the accumulator object by subtracting from the given axis', function(){
      var result = day1.subtractFromAxis(positionObj, 'x', 2)
      expect(result).to.have.property('x', -2)
    });
  });
  describe('#addToAxis()', function(){
    var directionObj = {
      "direction": 'U',
      "blocks": 5
    }
    var positionObj = {
      "x": 0,
      "y": 0,
      "direction": 'U'
    }
    it('updates the accumulator object by adding to the given axis', function(){
      var result = day1.addToAxis(positionObj, 'y', 2)
      expect(result).to.have.property('y', 2)
    });
  });
  describe('#move()', function(){
    it('moving while facing up increases the y axis value by the number specified', function(){
      var result = day1.move({"blocks": 5},{"x": 0, "y": 0, "direction": 'U'})
      expect(result).to.be.an('object');
      expect(result).to.have.property('y', 5)
    });
    it('moving while facing left decreases the x axis value by the number specified', function(){
      var result = day1.move({"blocks": 5},{"x": -1, "y": 0, "direction": 'L'})
      expect(result).to.have.property('x', -6)
    });
  });

  describe('#handleOneInstruction()', function(){
    var instructionOne = {
      "direction": 'R',
      "blocks": 5
    }
    var instructionTwo = {
      "direction": 'L',
      "blocks": 20
    }
    var instructionThree = {
      "direction": 'L',
      "blocks": 50
    }
    var positionObj = {
      "x": 0,
      "y": 0,
      "direction": 'U'
    }    
    it('moves 5 along the x axis and ends up facing right when told to', function(){
      day1.handleOne(positionObj, instructionOne)
      expect(positionObj).to.have.property('x', 5)
      expect(positionObj).to.have.property('y', 0)
      expect(positionObj).to.have.property('direction', 'R')
    });
    it('handles negative numbers in the correct way', function(){
      day1.handleOne(positionObj, instructionTwo)
      day1.handleOne(positionObj, instructionThree)
      expect(positionObj).to.have.property('x', -45)
      expect(positionObj).to.have.property('y', 20)
      expect(positionObj).to.have.property('direction', 'L')
    });
  });

  describe('#handleAllInstructions()', function(){
    var input = 'R5, L5, L5'
    it('ends up in the right place facing the right way', function(){
      var result = day1.handleAll(input)
      expect(result).to.have.property('x', 0)
      expect(result).to.have.property('y', 5)
      expect(result).to.have.property('direction', 'L')
    });

  });

  describe('#solvePartOne()', function(){
    var input = 'R5, L5, R5, R3'
    it('calculates the number of blocks away', function(){
      var result = day1.solvePartOne(input)
      assert.equal(12, result);
    });
  });
});

describe('Day1Part2', function(){  
  describe('#solvePartTwo()', function () {
    it('solves the example input', function () {
      var exampleInput = 'R8, R4, R4, R8'
      var result = day1.solvePartTwo(exampleInput)
      assert.equal(result, 4)
    })
  })
})
