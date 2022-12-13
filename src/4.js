"use strict";
let utils = require("./utils");

function solvePartOne(data) {
  data = data.split("\n");
  let fullyContained = 0;
  data.forEach((pair) => {
    let [[elf1start, elf1finish], [elf2start, elf2finish]] = pair
      .split(",")
      .map((e) => e.split("-").map((e) => +e));
    if (elf1start <= elf2start && elf1finish >= elf2finish) {
      fullyContained++;
      console.log(elf1start, "-", elf1finish, " and ", elf2start, "-", elf2finish, "YES 1");
    } else if (elf2start <= elf1start && elf2finish >= elf1finish) {
      fullyContained++;
      console.log(elf1start, "-", elf1finish, " and ", elf2start, "-", elf2finish, "YES 2");
    } else {
      console.log(elf1start, "-", elf1finish, " and ", elf2start, "-", elf2finish, "no");
    }
  });
  console.log(fullyContained);
}

// 5-7,7-9 overlaps in a single section, 7.
// 2-8,3-7 overlaps all of the sections 3 through 7.
// 6-6,4-6 overlaps in a single section, 6.
// 2-6,4-8 overlaps in sections 4, 5, and 6.
function solvePartTwo(data) {
  data = data.split("\n");
  let partlyContained = 0;
  data.forEach((pair) => {
    let [[elf1start, elf1finish], [elf2start, elf2finish]] = pair
      .split(",")
      .map((e) => e.split("-").map((e) => +e));
    if (elf1start <= elf2finish && elf1finish >= elf2start) {
      partlyContained++;
      console.log(elf1start, "-", elf1finish, " and ", elf2start, "-", elf2finish, "YES");
    } else {
      console.log(elf1start, "-", elf1finish, " and ", elf2start, "-", elf2finish, "no");
    }
  });
  console.log(partlyContained);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);

// a - b . c - d

// if a <= d AND b >=c
