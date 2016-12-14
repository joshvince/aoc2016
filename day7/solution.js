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
  if (!anyAbbaInHypernet(string)) {
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
function anyAbbaInHypernet(string) {
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

/*
Does the opposite of findHypernet.
Takes a string and returns only the supernet characters.
*/
function findSupernet(string) {
  return string.split(/\[.*?\]/g)
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

// PART TWO

function solvePartTwo(input) {
  var f = helpers.compose(checkForMatches, createObject)
  return input.split('\n').filter(str=>{
    return f(str)
  }).length
}

/*
Turns strings into objects of "abas"
Does this by grabbing "aba"s from the supernet and the hypernet portions and keeping them separate
*/
function createObject(string) {
  var hypernet = helpers.compose(findInArray, findHypernet)
  var supernet = helpers.compose(findInArray, findSupernet)
  return {
    hypernet: hypernet(string),
    supernet: supernet(string)
  }
}

/*
Given an object, returns true if any of the supernet strings contain corresponding hypernet babs.
Returns false if either of the arrays are empty (ie: contains no "abas" at all) or if there are no corresponding babs.
*/
function checkForMatches(obj) {
  if (obj.supernet.length == 0 || obj.hypernet.length == 0) {
    return false
  }
  else {
    return obj.supernet.some(supstr=>{
      return obj.hypernet.some(hypstr=>{
        return bab(supstr, hypstr)
      })
    })
  }
}

/*
maps an array calling findInString on each string.
Returns the flattened results of findInString
*/
function findInArray(array) {
  var arrays = array.map(str=>{
    return findInString(str)
  })
  return flatten(arrays)
}

function flatten(arr) {
  return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr;
}

/*
Recurses over a string to find abas and pushes them to the accumulator array.
Returns the accumulator array.
*/
function findInString(string, acc = [], pos = 0) {
  if (string.length < pos + 3) {
    return acc
  }
  else if (aba(string, pos)) {
    acc.push(`${string[pos]}${string[pos+1]}${string[pos]}`)
    return findInString(string, acc, pos + 1)
  }
  else {
    return findInString(string, acc, pos + 1)
  }
}

/*
A "bab" is defined as "aba" & "bab"
The second string must be the direct inverse of the first
Returns a bool depending on whether the strings are a bab
*/
function bab(one, two) {
  return (one[0] == two[1] && one[1] == two[0]) ? true : false
}

/*
An "aba" is defined as "aba" or "lol".
The first letter matches the third letter but not the second.
Returns a bool depending on whether the letter in the string at pos starts an "aba"
*/
function aba(string, pos) {
  return (!match(string, pos, 1) && match(string, pos, 2)) ? true : false
}

module.exports = {
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo
}
