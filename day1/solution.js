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

function solve(instructions){
  var destination = handleAllInstructions(instructions)
  return destination.x + destination.y
}

function handleAllInstructions(instructions){
  var init = {"x": 0, "y": 0, "direction": 'U'}
  return parseInput(instructions).reduce(handleOneInstruction, init)
}

function handleOneInstruction(currentPos, instruction){
  var turnedObj = turn(instruction, currentPos)
  return move(instruction, turnedObj)
}

function turn(instruction, currentPos){
  var clockface = ['U', 'R', 'D', 'L', 'U']
  var currentIndex = clockface.indexOf(currentPos.direction)

  if (instruction.direction === 'L') {
    if (currentPos.direction === 'U') {
      currentPos.direction = 'L'
    }
    else {
      currentPos.direction = clockface[(currentIndex - 1)]
    }
  }
  else if (instruction.direction === 'R') {
    currentPos.direction = clockface[(currentIndex + 1)]
  }
  return currentPos
}


function move(instruction, currentPos){
  // next: have to add or subtract from the axis based on the given direction...
  if (currentPos.direction === 'R') {
    return addToAxis(currentPos, 'x', instruction.blocks)
  }
  else if (currentPos.direction === 'L') {
    return subtractFromAxis(currentPos, 'x', instruction.blocks)
  }
  else if (currentPos.direction === 'U') {
    return addToAxis(currentPos, 'y', instruction.blocks)
  }
  else if (currentPos.direction === 'D') {
    return subtractFromAxis(currentPos, 'y', instruction.blocks)
  }
}

function subtractFromAxis(obj, axis, diff){
  obj[axis] -= diff
  return obj
}

function addToAxis(obj, axis, diff){
  obj[axis] += diff
  return obj
}

module.exports = {
  turn: turn,
  parseInput: parseInput,
  subtractFromAxis: subtractFromAxis,
  addToAxis: addToAxis,
  move: move,
  handleOne: handleOneInstruction, 
  handleAll: handleAllInstructions,
  solve: solve
}
