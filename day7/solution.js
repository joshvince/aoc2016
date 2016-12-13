var helpers = require('../helpers/helpers.js')

// PART ONE

// See the docs for checkOneString/1 for how this works.
function solvePartOne(input) {
  return input.split('\n').filter(str=>{
    return checkOneString(str)
  }).length
}

/*
processes one string, checking for abbas inside the hypernet first and then everywhere else next.
It only returns true if there is no abba inside hypernet but there is one outside it.
*/
function checkOneString(string) {
  if (!abbaInHypernet(string)) {
    return checkString(string, 0, abba)
  }
  else {
    return false
  }
}

/*
Grabs all the characters that were between square brackets (aka hypernet).
Returns true if any of them contain abba's, false otherwise
*/
function abbaInHypernet(string) {
  var f = helpers.compose(checkForAbba, findHypernet)
  return f(string)
}

/*
will return an array of characters that were enclosed in square brackets in the original string.
TODO: REFACTOR THIS INSANITY!
*/
function findHypernet(string) {
  return string.match(/\[(.*?)\]/g).join("").split(/\[(.*?)\]/g).filter(String)
}


// Takes in an array of strings and returns true if any of them have abbas inside them.
function checkForAbba(arr) {
  return arr.some((el) => {
    return checkString(el, 0, abba)
  })
}

/*
Iterates over a string and returns true if callback returns true for any position in the string.
callback should take two params: string and a position (integer)
*/
function checkString(string, pos, callback) {
  if (string.length < (pos+3)) {
    return false
  }
  else if (callback(string, pos)) {
    return true
  }
  else {
    return checkString(string, pos+1, callback)
  }
}

function abba(string, pos) {
  if (string[pos] != string[pos+1]) {
    if (match(string, pos, 3) && match(string, pos+1, 1)) {
      return true
    }
    else {
      return false
    }
  }
  else {
    return false
  }
}

function match(string, pos, inc) {
  return (string[pos] == string[pos+inc]) ? true : false
}

module.exports = {
  solvePartOne: solvePartOne
}
