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

function handleAllInstructions(instructionArray, accumulator){
  if (instructionArray.length === 0) {
    return accumulator
  }
  else {
    var current = instructionArray.shift()
    // call the function that turns and store it in the result variable
    var result ;

    return handleAllInstructions(instructionArray, result)
  }
}

function handleOneInstruction(instr, acc){
  return new Promise((resolve, reject) => {
    resolve( turn(acc.direction, instr.direction) );
  }).then(newDirection => {
    acc.direction = newDirection
    return move(instr, acc)
  });
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




var result = parseInput(test)

console.log(result)

module.exports = {
  turn: turn,
  parseInput: parseInput,
  subtractFromAxis: subtractFromAxis,
  addToAxis: addToAxis,
  move: move,
  handleOne: handleOneInstruction
}
