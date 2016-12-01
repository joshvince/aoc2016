var fs = require('fs');

fs.readFile(__dirname + '/day1input.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  return data
});

var test = 'R4, R3, R5, L3, L5, R2, L2, R5'

function parseInput(longString){
  return longString.split(',').map(str => { 
    return str.trim() 
  }).map(str => {
    return createDirectionObj(str)
  })
}

function createDirectionObj(str){
  return {
    "direction": str.substring(0,1),
    "blocks": str.substring(1)
  }
}

function calculateFacing(curr, new){
  var clockface = ['U', 'R', 'D', 'L', 'U']
  // receiving an 'R' instruction should move your clockface position n + 1
  // receiving an 'L' instruction should move your clockface position n - 1
}

var result = parseInput(test)

console.log(result)

