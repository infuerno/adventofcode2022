"use strict";
let utils = require("./utils");

function solvePartOne(data) {
  data = data.split("\n")[0];
  console.log(data);
  let continueOuter = false;
  for (let i = 4; i < data.length + 1; i++) {
    let segment = Array.from(data.slice(i - 4, i));
    console.log(i, segment);
    while (segment.length > 0) {
      let test = segment.pop();
      console.log(segment, test);
      if (segment.includes(test)) {
        continueOuter = true;
        break;
      }
    }
    if (continueOuter) {
      continueOuter = false;
      continue;
    }
    console.log(i);
    break;
  }
}

function solvePartTwo(data) {
  data = data.split("\n")[0];
  console.log(data);
  let continueOuter = false;
  for (let i = 14; i < data.length + 1; i++) {
    let segment = Array.from(data.slice(i - 14, i));
    console.log(i, segment);
    while (segment.length > 0) {
      let test = segment.pop();
      console.log(segment, test);
      if (segment.includes(test)) {
        continueOuter = true;
        break;
      }
    }
    if (continueOuter) {
      continueOuter = false;
      continue;
    }
    console.log(i);
    break;
  }
}

let nullFn = () => null;
// utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
