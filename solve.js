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

module.exports = {
  load: loadInput,
  run: solve
}

