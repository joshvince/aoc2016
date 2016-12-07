var chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should;

var s = require('../day4/solution.js')

describe('Day Four', function () {
  var testInput = 'aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]'
  describe('Part One', function () {
    describe('#solvePartOne()', function () {
      it('should solve the test input correctly ', function () {
        expect(s.solvePartOne(testInput)).to.equal(1514)
      })
    })
  })
})