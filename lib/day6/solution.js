const helpers = require('../helpers/helpers.js')

/*
parses the input to create arrays that run vertically down,
rather than horizontally across the input
*/
function parseInput(input) {
  var horizontalArrays = input.split('\n').map(str=>{ return str.split("")})
  return horizontalArrays[0].map((el,i)=>{
    return verticalise(i, horizontalArrays).sort();
  })
}

function verticalise(pos, array) {
  return array.map(arr=>{
    return arr[pos]
  })
}

/* 
See squashLettersTogether/3 for what this does 
*/
function splitAndSquash(array){
  var init = array.shift();
  return squashLettersTogether([], init, array)
}

/* 
Recurses through the array checking if each element is the same letter as the last.
If it's the same, it concats all instances of that letter into a string like this 'aaaa'
It returns an array of strings that are all the same letter, like this: ['aaaa', 'bb']
*/
function squashLettersTogether(acc, currentString, array){
  if (array.length === 0) {
    acc.push(currentString)
    return acc
  }
  else {
    var element = array.shift();
    if (element === currentString[0]) {
      var newString = currentString.concat(element);
      return squashLettersTogether(acc, newString, array)
    }
    else {
      acc.push(currentString)
      return squashLettersTogether(acc, element, array)
    }
  }  
}

/*
sorts the ['aaaa', 'bbb'] arrays by longest (ie: most frequent) first
*/
function sortByLongest(array) {
  return array.sort((a,b)=>{ 
    return b.length - a.length
  })
}

/*
sorts the ['aaaa', 'bbb'] arrays by shortest (ie: least frequent) first
*/
function sortByShortest(array) {
  return array.sort((a,b)=>{
    return a.length- b.length
  })
}

function firstLetterOnly(array) {
  return array[0][0]
}

/*
See the docs for the individual functions to see how we get here...
*/
function solvePartOne(input) {
  var f = helpers.compose(firstLetterOnly, sortByLongest, splitAndSquash)
  return parseInput(input).map(arr=>{
    return f(arr)
  }).join("")
}

/*
See the docs for the individual functions to see how we get here...
*/
function solvePartTwo(input){
  var f = helpers.compose(firstLetterOnly, sortByShortest, splitAndSquash)
  return parseInput(input).map(arr=>{
    return f(arr)
  }).join("")
}

module.exports = {
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo
}
