const md5 = require('js-md5');
/*
Part One
*/

function solvePartOne(input) {
  return getPassword(input)
}

function getPassword(input) {
  var index = 0;
  var password = '';

  while (password.length < 8) {
    var hash = md5(`${input}${index}`)
    if (fiveZeros(hash)) {
      password += hash[5]
    }
    index ++
  }

  return password
}

function fiveZeros(hash) {
  return (hash.substring(0,5) == '00000') ? true : false
}

/*
Part Two
*/

function solvePartTwo(input) {
  return complexPassword(input)
}

function complexPassword(input) {
  var index = 0;
  var pos = 0;
  var password = ['','','','','','','',''];

  while (testLength(password) < 8) {
    var hash = md5(`${input}${index}`)
    if (validHash(hash) && !alreadyAssigned(password, hash[5])) {
      password[hash[5]] += hash[6]
    }
    index ++
  }
  return password.join("")
}

function validHash(hash) {
  return (hash.substring(0,5) == '00000' && hash[5] < 8) ? true : false
}

function alreadyAssigned(passwordArray, pos) {
  return (passwordArray[pos] == '') ? false : true
}

function testLength(array) {
  return array.join("").length
}

module.exports = {
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo
};
