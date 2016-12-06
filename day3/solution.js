function solvePartOne(input){
  var array = parseInput(input)
  return countTriangles(array)
}

function solvePartTwo(input){
  var firstPass = parseInput(input)
  var acc = 0;
  for (var i = 0; i < 3; i++) {
    var verticals = parseVertical(firstPass, [i])
    acc += countTriangles(verticals);
  }
  return acc
}


function parseInput(string){
  return string.split(`\n`).map(str=>{
    return str.trim()
  }).map(str=>{
    return str.split(" ").map(str=>{ 
      return parseInt(str) 
    }).filter(el=>{ 
      return !isNaN(el) 
    })
  })
}

function parseVertical(list, index){
  var newArray = list.map(array=>{
    return array[index]
  })
  return chunk(newArray, 3)
}

function chunk(array, chunkLength) {
  var chunks = [];
  for (var i = 0; i < array.length; i += chunkLength) {
    chunks.push(array.slice(i, i + chunkLength));
  }
  return chunks
}

function countTriangles(array) {
  return array.reduce((acc,el)=>{
    if (trueTriangle(el)) {
      acc ++
    }
    return acc
  }, 0)
}

function trueTriangle(array) {
  if ((array[0] + array[1]) > array[2] && (array[1] + array[2]) > array[0] && (array[0] + array[2]) > array[1]) {
    return true
  }
  else {
    return false
  }
}

module.exports = {
  solvePartOne: solvePartOne,
  solvePartTwo: solvePartTwo
}
