/*
HELPER FUNCTIONS
Used in more than one module
*/

/*
Composes functions together allowing the result of the last function to be called by the next.
CAVEAT: For now, you need to input the functions right-to-left.
Which means, if you wanted to map an array and then filter the results of your map, you'd call:
compose(filter, map)
*/
function compose() {
  var funcs = arguments;
  return function() {
    var args = arguments;
    for (var i = funcs.length; i --> 0;) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
};

/*
Flattens nested arrays together and returns a flat array
*/
function flatten(arr) {
  return Array.isArray(arr) ? [].concat(...arr.map(flatten)) : arr;
}

module.exports = {
  compose: compose,
  flatten: flatten
}
