var helpers = require('../helpers/helpers.js')

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

/*
PART ONE:
*/

function solvePartOne(instructions){
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

/* 
PART TWO
*/

function solvePartTwo(input){
  var instructions = parseInput(input),
  initial = initialise()
  return processAll(initial, instructions)
}

function initialise(){
  var initPos = {"x": 0, "y": 0, "direction": 'U'},
  initPath = [[0,0]]
  return {
    current: initPos,
    former: null,
    path: initPath
  }
}

function processAll(positionObject, instructions){
  var senseCheck = ['current', 'path', 'former'].filter(prop => { 
    return Object.keys(positionObject).includes(prop) 
  })
  if (senseCheck.length != 3) {
    throw new TypeError ("invalid positionObject: \n" + JSON.stringify(positionObject))
  }
  else {
    if (positionObject.hasOwnProperty('match')) {
      var res = positionObject.match
      return Math.abs(res[0]) + Math.abs(res[1])
    }
    else if (instructions.length === 0 ) {
      throw new Error(`there was a problem with the input. You never visited anywhere twice. Output: \n
        ${JSON.stringify(positionObject, null, 2)}`)
    }
    else {
      return processOne(positionObject, instructions)
    }   
  }
}

function processOne(object, instructions) {
  var nextInstruction = instructions.shift();
  var result = executeOneCommand(object, nextInstruction)
  return processAll(result, instructions)
}

function executeOneCommand(object, instruction) {
  var preppedObject = copyInstruction(object, instruction)
  var execute = helpers.compose(updatePath, applyInstruction, moveCurrentToFormer)
  return execute(preppedObject)
}

function newObject(object, key, value) {
  var copy = Object.assign({}, object)
  copy[key] = value
  return copy
}

function copyInstruction(object, instruction) {
  return newObject(object, "instruction", instruction)
}

function moveCurrentToFormer(object){
  var copy = Object.assign({}, object.current)
  return newObject(object, "former", copy)
}

function applyInstruction(object) {
  var newPos = handleOneInstruction(object.current, object.instruction)
  return newObject(object, "current", newPos)
}

function updatePath(object){
  var newPath = calculateCoords(object.former.x, object.current.x, object.former.y, object.current.y)
  var dupes = newPath.find(coord => { return pairInArray(coord, object.path) })
  if (typeof dupes !== 'undefined') {
    return newObject(object, "match", dupes)
  }
  else {
    var updatedPathArray = object.path.concat(newPath)
    return newObject(object, "path", updatedPathArray)
  }
}

function pairInArray(pair, array){
  return array.find(el=>{
    return samePair(pair, el);
  })
}

function samePair(elOne, elTwo){
  return elOne[0] == elTwo[0] && elOne[1] == elTwo[1]
}

// works out which pair is different and calls generator functions, returning the result of both
function calculateCoords(xstart, xend, ystart, yend){
  var increments = (xstart === xend) ? incrementalArray(ystart, yend) : incrementalArray(xstart, xend)
  var result = (xstart === xend) ? shiftStaticValues(increments, xstart) : popStaticValues(increments, ystart)
  return result
}

// builds an incremental array based on the start and end values.
// like this: [0,1,2,3] or [3,2,1,0,-1]
function incrementalArray(start, end){
  var result = []
  if (start < end) {
    for (var i = start + 1; i <= end; i++) {
      result.push(i);
    }
  }
  else {
    for (var i = start - 1; i >= end; i--) {
      result.push(i);
    }
  }
  return result
}

// adds the static (other axis') value to the front of each item in the array
function shiftStaticValues(array, staticValue){
  return array.map(el => {return [staticValue, el] })
}

// adds the static (other axis') value to the end of each item in the array
function popStaticValues(array, staticValue){
  return array.map(el => {return [el, staticValue] })
}

module.exports = {
  turn: turn,
  parseInput: parseInput,
  subtractFromAxis: subtractFromAxis,
  addToAxis: addToAxis,
  move: move,
  handleOne: handleOneInstruction, 
  handleAll: handleAllInstructions,
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo,
}
