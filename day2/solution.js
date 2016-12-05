function parseInput(longString){
  return longString.split(`\n`).map(str => { 
    return str.split("") 
  })
}

function getAllNumbers(init, directions, callback) {
  var code = [init];
  directions.forEach((array, i) => {
    var num = getOneNumber(code[i], array, callback)
    code.push(num);
  })
  return code
}

function getOneNumber(init, directionsArray, callback) { 
  return directionsArray.reduce((acc, dir) => { 
    return callback(acc, dir);
  }, init)
}

// PART ONE:

function solvePartOne(input){
  var directions = parseInput(input)
  var codeArray = getAllNumbers(5, directions, move)
  codeArray.shift()
  return parseInt(codeArray.join(""))
}

/*
moving up minuses 3 unless the start button is < 4
moving down adds 3 unless the start button is > 6
moving right adds 1 unless the start button is a multiple of 3
moving left minuses 1 unless the answer is < 1 or a multiple of 3
*/

function move(pos, direction) {
  switch (direction) {
    case 'U':
      return failsafe(pos, pos - 3)
      break;
    case 'R':
      return failsafe(pos, pos + 1)
      break;
    case 'D':
      return failsafe(pos, pos + 3)
      break;
    case 'L':
      return failsafe(pos, pos - 1)
      break;
    default:
      throw new Error("bad input")
  }
}

function failsafe(prev, next) {
  switch (next - prev) {
    case -3:
      return catchUp(prev, next)
      break;
    case 3: 
      return catchDown(prev, next)
      break;
    case 1: 
      return catchRight(prev, next)
      break;
    default:
      return catchLeft(prev, next)
  }
}

function catchUp(prev, next) {
  var verdict = (prev < 4) ? prev : next
  return verdict
}

function catchDown(prev, next) {
  var verdict = (prev > 6) ? prev : next
  return verdict
}

function catchLeft(prev, next) {
  var verdict = (next % 3 === 0) ? prev : next
  return verdict
}

function catchRight(prev, next) {
  var verdict = (prev % 3 === 0) ? prev : next
  return verdict
}

/*
PART TWO
*/

/*

[[x,x,1,x,x],[x,2,3,4,x],[5,6,7,8,9],[x,a,b,c,x],[x,x,d,x,x]]

'D' moves you one more array along the pad array
'R' moves you one index along the existing array
'L' moves you one index previous along the existing array
'U' moves you one array previous along the pad array
if you ever get an 'undefined', you went wrong, and should stay where you are.
*/

function solvePartTwo(input) {
  var directions = parseInput(input)
  var codeArray = getAllNumbers([2,0], directions, executeOneCommand)
  codeArray.shift()
  return printCode(codeArray)
}

function printCode(positions){
  var keypad = generateKeypad()
  var code = [];
  positions.forEach(arr => {
    var row = arr[0],
    key = arr[1]
    code.push(keypad[row][key])
  })
  return code.join("")
}

function generateKeypad(){
  return [[,,1,,],[,2,3,4,],[5,6,7,8,9],[,'a','b','c',],[,,'d',,]]
}

function executeOneCommand(posArray, direction){
  var row = posArray[0],
  pos = posArray[1],
  newPos;
  switch (direction) {
    case 'U':
      newPos = validMove(row-1, pos)
      break;
    case 'R':
      newPos = validMove(row, pos+1)
      break;
    case 'D':
      newPos = validMove(row+1, pos)
      break;
    case 'L':
      newPos = validMove(row, pos-1)
      break;
    default:
      throw new Error ("the input was not a valid direction")
      break;
  }
  return newPos ? newPos : posArray
}

function validMove(row, pos){
  var keypad = generateKeypad()
  if (typeof keypad[row][pos] === 'undefined'){
    return false
  }
  else {
    return [row, pos]
  }
}

module.exports = {
  parseInput: parseInput,
  failsafe: failsafe,
  move: move,
  getOneNumber: getOneNumber,
  getAllNumbers: getAllNumbers,
  solvePartOne: solvePartOne,
  generateKeypad: generateKeypad,
  executeOneCommand: executeOneCommand,
  printCode: printCode,
  solvePartTwo: solvePartTwo
}
