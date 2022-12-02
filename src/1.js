"use strict";
let utils = require("./utils");

function solvePartOne(data) {
  let max = 0;
  data = data
    .split("\n")
    .map((x) => x.replace("\r", ""))
    .reduce((acc, cur) => {
      if (!cur) {
        // empty string, check for new max and move to next elf
        if (acc > max) max = acc;
        return 0; // reset acc
      }
      return acc + +cur;
    }, 0);
  console.log(max);
}

function solvePartTwo(data) {
  let max = [0, 0, 0];
  data = data
    .split("\n")
    .map((x) => x.replace("\r", ""))
    .reduce((acc, cur) => {
      if (!cur) {
        // empty string, check for new max and move to next elf
        if (max.some((x) => acc > x)) {
          max.sort((a, b) => a - b).shift();
          max.push(acc);
        }
        return 0; // reset acc
      }
      return acc + +cur;
    }, 0);
  console.log(max.reduce((acc, cur) => (acc += cur)));
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
