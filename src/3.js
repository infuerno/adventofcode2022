"use strict";
let utils = require("./utils");

function getPriority(letter) {
  if (letter.toLowerCase() === letter) {
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

function solvePartOne(data) {
  data = data.split("\n");
  let priority = data.reduce((acc, rucksack) => {
    let c1 = rucksack.slice(0, rucksack.length / 2);
    let c2 = rucksack.slice(rucksack.length / 2, rucksack.length);
    console.log(rucksack);
    console.log(c1, c2);
    let common = Array.from(c1).find((a) => c2.includes(a));
    console.log(common);
    acc += getPriority(common);
    return acc;
  }, 0);
  console.log(priority);
}

function solvePartTwo(data) {
  data = data.split("\n");

  let groups = data.reduce((acc, cur, i) => {
    if (i % 3 == 0) acc.push([]);
    acc[acc.length - 1].push(cur);
    return acc;
  }, []);

  let priority = groups.reduce((acc, g) => {
    console.log(g);
    let common = Array.from(g[0]).filter((x) => g[1].includes(x));
    let badge = common.filter((x) => g[2].includes(x));
    console.log(badge);
    let priority = getPriority(badge[0]);
    console.log(priority);
    return acc + priority;
  }, 0);
  console.log(priority);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
