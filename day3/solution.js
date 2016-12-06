function solvePartOne(input){
  var array = parseInput(input)
  console.log(array)
  return countTriangles(array)
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

[ 144, 508, 567 ]

module.exports = {
  solvePartOne: solvePartOne,
}
