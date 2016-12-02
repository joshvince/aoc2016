var fs = require('fs');
require('babel-register');

function solve(day, part){
  var directoryPath = `${__dirname}/day${day}`
  loadInput(day, directoryPath).then(data => {
    var Solution = require(`${directoryPath}/solution.js`)
    if (part === 1) {
      console.log(Solution.solvePartOne(data))
    }
    else {
      console.log(Solution.solvePartTwo(data))
    }
  }).catch(error => {
    console.log(error)
  })
}

function loadInput(day, directory){
  var filepath = `${directory}/input.txt`
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, function(err, data){
      if (err) {
        reject(err);
      }
      else {
        resolve(data.toString());
      }
    })
  })
}

function run(obj, callback){
  obj.y += 5
  if (typeof callback === 'function') {
    var res = callback(obj);
    console.log("returned the following: " + JSON.stringify(res))
    return res;
  }
}

function step1(obj){
  obj.x += 5
  return obj
}


module.exports = {
  run: solve
}

