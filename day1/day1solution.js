var test = 'R4, R3, R5, L3, L5, R2, L2, R5'

function parseInput(longString){
  return longString.split(',').map(str => { 
    return str.trim() 
  }).map(str => {
    return createInstructionObj(str)
  })
}

function createInstructionObj(str){
  return {
    "direction": str.substring(0,1),
    "blocks": parseInt(str.substring(1))
  }
}

function turn(curr, change){
  var clockface = ['U', 'R', 'D', 'L', 'U']
  var currentPos = clockface.indexOf(curr)

  if (change === 'L') {
    if (curr === 'U') {
      return 'L'
    }
    else {
      return clockface[(currentPos - 1)]
    }
  }
  else if (change === 'R') {
    return clockface[(currentPos + 1)]
  }
}

function move(instruction, currentPos){
  var num = instruction.blocks
  // next: have to add or subtract from the axis based on the given direction...
}

function subtractFromAxis(obj, axis, diff){
  obj[axis] -= diff
  return obj
}

function addToAxis(obj, axis, diff){
  obj[axis] += diff
  return obj
}




var result = parseInput(test)

console.log(result)

module.exports = {
  turn: turn,
  parseInput: parseInput,
  subtractFromAxis: subtractFromAxis,
  addToAxis: addToAxis
}
