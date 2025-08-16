"use strict";
let utils = require("./utils");

function solvePartOne(data) {
  data = data.trim().split("\n");
  console.log(data);
}

function solvePartTwo(data) {}

let nullFn = () => null;
utils.solve(__filename, solvePartOne, nullFn, true);
//utils.solve(__filename, nullFn, solvePartTwo, true);
