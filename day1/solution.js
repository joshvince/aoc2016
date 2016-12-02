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

/*
Part 2 pseudo code:

An instruction creates a path.
{x: 0, y: 0, direction: U} -> R3 creates:
x: 1, y: 0
x: 2, y: 0
x: 3, y: 0

I could keep a store of the paths, like:

{
  "x": {
    "0": ["0"],
    "1": ["0"],
    "2": ["0"],
    "3": ["0"]
  },
  "y": {
    "0": ["1", "2", "3", "4"]
  }
}

Then, i could write a lookup function that says, for each path object created:

1: work out which axis we are travelling on.
2: if obj[${axis}][${start position}] array contains the non-travelling axis value - we've crossed paths

in the above example:

{x: 1, y: 1, direction: L} -> L2, I would create:
x: 0, y: 1
x: -1, y: 1

And then, because we are travelling on the Y axis, I should look up obj.y.1 -- if either 0 || 1 are present, we've crossed paths

Otherwise, I should add all the values to the obj.y.1 array and keep going

So: we want:

A function to move us from one co-ordinate to another

A function that tells us which path we are moving on, and how far we have come - DONE!

A function that creates the traversed coordinates - DONE!

A function that looks up the pathList object in the relevant array and checks if any of the traversed coordinates are already present

A function that adds coordinates to the pathList object

*/








// this is untested.... take a look at this...


function run(currentPosition, instruction){
  // come up with a better name for this...
  return startPositionEndPosition(currentPosition, instruction, function(){
    generatePathDetails(function(){
      // from this closure we should be able to:
      // -- grab the new position (first argument)
      // -- grab the path object (second argument)
    });
  });
}






function startPositionEndPosition(currentPosition, instruction, callback){
  var start = Object.assign({}, currentPosition)
  var end = handleOneInstruction(currentPosition, instruction)
  // pass the old object and the new object to the function that will generate the path details
  return callback(start, end)
}


function generatePathDetails(oldPos, newPos, callback){
  var pathObject;
  if (oldPos.y === newPos.y) {
    pathObject = createPathObject("y", oldPos.y, oldPos.x, newPos.x)
  }
  else {
    pathObject = createPathObject("x", oldPos.x, oldPos.y, newPos.y)
  }
  // keep the new position and the path object and pass it to the next object in the chain
  callback(newPos, pathObject)
}

function createPathObject(axis, street, start, end){
  var object = {
    "axis": axis,
    "street": street.toString(),
    "blocks": []
  } 
  for (var i = start; i <= end; i++) {
    object.blocks.push(i.toString())
  }
  return object
}

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

module.exports = {
  turn: turn,
  parseInput: parseInput,
  subtractFromAxis: subtractFromAxis,
  addToAxis: addToAxis,
  move: move,
  handleOne: handleOneInstruction, 
  handleAll: handleAllInstructions,
  solvePartOne: solvePartOne,
  generatePathDetails: generatePathDetails,
  startPositionEndPosition: startPositionEndPosition,
  onlyEndPosition: onlyEndPosition

}
