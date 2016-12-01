var fs = require('fs');
require('babel-register');

function loadFile(day, filename){
  var filepath = `${__dirname}/day${day}/${filename}`
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

loadFile(1, 'day1solution.js').then(data => {
  console.log(data)
}).catch(error => {
  console.log(error)
})
