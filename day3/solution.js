/*
psuedo:

- split on \n
- split all of them on spaces
- trim the spaces

You're left with [x,y,z]

Recurse over the array:
call Array.reduce with an accumulator of []

pop off the first element.

    a function that sorts the elements lowest - highest

    a function that returns true if:
    x + y > z
    and false otherwise

return result.lengthOf
*/

function solvePartOne(input){
  var array = parseInput(input)
  // return array
  return countTriangles(array).length
}


function parseInput(string){
  return string.split(`\n`).map(str=>{
    return str.trim()
  }).map(str=>{
    return str.split("  ")
  }).map(array=>{
    return array.map(str=>{ return parseInt(str)})
  })
}

function countTriangles(array) {
  return array.reduce((acc,el)=>{
    if (trueTriangle(el)) {
      acc.push(el)
    }
    return acc
  }, [])
}

function trueTriangle(array) {
  var sorted = array.sort((a,b)=>{return a - b})
  return (sorted[0] + sorted[1] > sorted[2]) ? true : false
}

module.exports = {
  solvePartOne: solvePartOne
}
