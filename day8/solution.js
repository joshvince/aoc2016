const helpers = require('../helpers/helpers.js')

function solvePartTwo(input) {
  var res = parseInput(input).reduce(handleOneInstruction, initialise())
  var log = res.map(arr => { return `${arr.join("")}\n`})
  console.log(log)
}

function solvePartOne(input) {
  var resultGrid = parseInput(input).reduce(handleOneInstruction, initialise())
  return helpers.flatten(onlyLitPixels(resultGrid)).length
}

// Creates an empty array (full of .s) 50x6 to get started
function initialise() {
  return [1,2,3,4,5,6].map(el => { return new Array(50).fill('.') })
}

function parseInput(input) {
  var res = input.split('\n')
  res.pop()
  return res.map(str => { return str.split(" ") })
  .map(arr => { return parseInstruction(arr) })
  .map(arr => { return helpers.flatten(arr) })
}

// Instruction should be an array containing words/instructions and no spaces
function parseInstruction(instruction) {
  if (instruction[0] == 'rect') {
    return instruction.map(str=>{
      return str.split("x")
    })
  }
  else if(instruction[0] == 'rotate'){
    return instruction.filter(str => {
      return str != 'by'
    }).map(str => {
      return str.split("=")
    })
  }
  else {
    throw new Error (`There was an invalid instruction: \n ${instruction}`)
  }
}

function handleOneInstruction(array, instruction) {
  console.log(`given array was ${array.length}`)
  console.log(`${instruction}\n${array}`);
  if (instruction[0] == 'rect') {
    return rect(array, instruction[1], instruction[2])
  }
  else {
    // We will have a redundant 'x' or 'y' in the array at pos 2.
    return rotate(array, instruction[1], instruction[3], instruction[4])
  }
}

function onlyLitPixels(grid) {
  return grid.map(arr => {
    return arr.filter(el => {
      return el == '#'
    })
  })
}

// TODO: doc this up!

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

/*
Rotates the column or row at `pos` by the number of `moves`.
Will rotate the column or the row depending on whether `column` or `row` is
given as the second argument
*/
function rotate(array, type, pos, moves) {
  switch (type) {
    case 'row':
      return rotateRow(array, pos, moves)
      break;
    case 'column':
      return rotateCol(array, pos, moves)
      break
  }
}

/*
Rotates the row dicated by the `pos` argument by the number of
`moves` provided.
Returns the modified array
*/
function rotateRow(array, pos, moves) {
  var newRow = array[pos]
  array[pos] = shiftArray(newRow, moves)
  return array
}

/*
Gets a column with the collectColumn/2 function.
Then shifts that column with the shiftArray/2 function
Then replaces the column in the existing array with the shifted values.
Returns the updated master array
*/
function rotateCol(array, pos, moves) {
  var result = array;
  var column = collectColumn(result, pos)
  var newCol = shiftArray(column, moves)
  newCol.forEach((newVal, i) => {
    result[i][pos] = newVal
  })
  return result
}

/*
Shifts the array along by the number of moves supplied.
REMEMBER: moves the items that fell off the edge to the front of the array.
ie: given the arguments [1,2,3,4] and 2, will return:
[3,4,1,2]
*/
function shiftArray(array, moves) {
  var copy = array
  var shiftedPixels = copy.splice((0 - moves))
  copy.unshift(shiftedPixels)
  return helpers.flatten(copy)
}

/*
Grabs elements at pos in each of the array elements within `array`
ie: given the arguments [[1,2,3],['a','b','c']] and 1, will return:
[2, 'b'] as those are the column at position 1.
*/
function collectColumn(array, pos) {
  return array.map(subarr => {
    return subarr[pos]
  })
}

// Turns .s into #s and vice versa
function switchPixel(el) {
  return (el == '.') ? '#' : '.'
}

/*
PART TWO
*/



module.exports = {
  parseInput: parseInput,
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo
}
