/*
Part One
*/

const helpers = require('../helpers/helpers.js')

function initialise() {
  return [0,1,2,3,4,5].map(el => { return Array(50) })
}

function solvePartOne(input) {
  var array = initialise()
  var stepOne = rect(array,3,2)
  return rotate(stepOne, 'row', 0, 1)
}

function rect(array, width, height) {
  var result = array;
  for (var y = 0; y < height; y++) {
    var x = 0;
    while (x < width) {
      result[y][x] = switchPixel(result[y][x])
      x ++
    }
  }
  return result
}

function rotate(array, type, pos, moves) {
  switch (type) {
    case 'row':
      return rotateRow(array, pos, moves)
      break;
    case 'column':
      return array
      break
  }
}

function rotateRow(array, pos, moves) {
  var copy = array[pos]
  var pixels = copy.splice((0 - moves))
  copy.unshift(pixels)
  array[pos] = helpers.flatten(copy)
  return array
}

function switchPixel(el) {
  return (el == undefined) ? 1 : undefined
}


module.exports = {
  solvePartOne: solvePartOne
}
