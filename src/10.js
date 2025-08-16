"use strict";
let utils = require("./utils");

function solvePartOne(data) {
  data = data.trim().split("\n");
  let register = 1;
  let cycle = 0;
  let ssTotal = 0;
  data.forEach((instruction) => {
    let value;
    if (instruction === "noop") {
      cycle++;
    } else {
      value = +instruction.replace("addx ", "");
      cycle++;
    }
    if ((cycle - 20) % 40 === 0) {
      let ss = cycle * register;
      console.log("cycle", cycle, "signal strength", ss);
      ssTotal += ss;
    }
    if (value) {
      cycle++;
      if ((cycle - 20) % 40 === 0) {
        let ss = cycle * register;
        console.log("cycle", cycle, "signal strength", ss);
        ssTotal += ss;
      }
      register += value;
    }
  });
  console.log(ssTotal);
}

function getSprite(register) {
  return [register - 1, register, register + 1];
}

function solvePartTwo(data) {
  data = data.trim().split("\n");
  let register = 1;
  let sprite = getSprite(register);
  let cycle = 0;
  let row = "";
  data.forEach((instruction) => {
    //if (cycle > 20) return;
    let value;
    // console.log("noop-or-addx-1sthalf", cycle, sprite);
    row += sprite.includes(cycle % 40) ? "#" : ".";
    if (instruction !== "noop") {
      value = +instruction.replace("addx ", "");
    }
    if (++cycle % 40 === 0) {
      console.log(row);
      row = "";
    }
    if (value) {
      // console.log("addx-2ndhalf", cycle, sprite);
      row += sprite.includes(cycle % 40) ? "#" : ".";
      if (++cycle % 40 === 0) {
        console.log(row);
        row = "";
      }
      register += value;
      sprite = getSprite(register);
    }
  });
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
