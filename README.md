# Advent of Code 2016

## To get the answers to a puzzle in JS:
From the root of this directory, run the following commands:  
*${day} and ${part} are both numbers*   
`node`  
`var solution = require('./solve.js')`  
`solution.run(${day}, ${part})`  

## To get the answers to a puzzle in Elixir:
From the root of this directory, run the following commands:  
*${day} and ${part} are both numbers*  
`iex -S mix`  
`r Solve`  
`r Day${day}.Solution`  
`alias Day${day}.Solution`  
`Solve.load_input(${day}) |> Solution.solve_part_${part}`


## Learning Resources I've used here:

### Testing and BDD - Mocha and Chai
http://chaijs.com/api/bdd/
https://mochajs.org/

### Composing functions
http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/
