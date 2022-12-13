"use strict";
let utils = require("./utils");

function getStacks(data) {
  let rows = data.filter((x) => x.includes("[")).reverse();
  let stacks = [];
  rows.forEach((row) => {
    for (let i = 0; i < row.length; i += 4) {
      let letter = row.slice(i + 1, i + 2);
      let stack = i / 4;
      stacks[stack] = stacks[stack] || [];
      if (letter !== " ") stacks[stack].push(letter);
    }
  });
  console.log(stacks);
  return stacks;
}

function getDirections(data) {
  return data
    .filter((x) => x.startsWith("move"))
    .map((x) =>
      x
        .split(" ")
        .filter((x) => !isNaN(parseInt(x)))
        .map((x) => +x)
    );
}

function solvePartOne(data) {
  data = data.split("\n");
  let stacks = getStacks(data);
  let directions = getDirections(data);

  directions.forEach(([numberToMove, from, to]) => {
    while (numberToMove-- > 0) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  });
  console.log(stacks);
  let topOfStacks = stacks.reduce((acc, cur) => (acc += cur.pop()), "");
  console.log(topOfStacks);
}

function solvePartTwo(data) {
  data = data.split("\n");
  let stacks = getStacks(data);
  let directions = getDirections(data);

  directions.forEach(([numberToMove, from, to]) => {
    let removed = stacks[from - 1].splice(stacks[from - 1].length - numberToMove, numberToMove);
    stacks[to - 1] = stacks[to - 1].concat(removed);
  });
  console.log(stacks);
  let topOfStacks = stacks.reduce((acc, cur) => (acc += cur.pop()), "");
  console.log(topOfStacks);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
