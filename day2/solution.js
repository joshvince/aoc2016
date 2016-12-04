function parseInput(longString){
  return longString.split(`\n`).map(str => { 
    return str.split("") 
  })
}

function solvePartOne(input){
  var directions = parseInput(input)
  return getAllNumbers(5, directions)
}

/*
moving up minuses 3 unless the start button is < 4
moving down adds 3 unless the start button is > 6
moving right adds 1 unless the start button is a multiple of 3
moving left minuses 1 unless the answer is < 1 or a multiple of 3
*/

function getAllNumbers(init, directions) {
  var code = [init];
  directions.forEach((array, i) => {
    var num = getOneNumber(code[i], array)
    code.push(num);
  })
  return parseCode(code)
}

function parseCode(array) {
  array.shift();
  return parseInt(array.join(""))
}

function getOneNumber(init, directionsArray) { 
  return directionsArray.reduce((acc, dir) => { 
    return move(acc, dir);
  }, init)
}

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

module.exports = {
  parseInput: parseInput,
  failsafe: failsafe,
  getOneNumber: getOneNumber,
  getAllNumbers: getAllNumbers,
  solvePartOne: solvePartOne
}
