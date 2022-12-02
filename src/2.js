"use strict";
let utils = require("./utils");

function translate(strategy) {
  if (strategy === "A" || strategy === "X") return "R";
  if (strategy === "B" || strategy === "Y") return "P";
  if (strategy === "C" || strategy === "Z") return "S";
  throw new Error("unrecognised strategy", strategy);
}

function getScoreForStrategy(strategy) {
  switch (strategy) {
    case "R":
      return 1;
    case "P":
      return 2;
    case "S":
      return 3;
    default:
      throw new Error("unrecognised strategy", strategy);
  }
}

function getLosingStrategoryAgainst(strategy) {
  switch (strategy) {
    case "R":
      return "S";
    case "P":
      return "R";
    case "S":
      return "P";
    default:
      throw new Error("unrecognised strategy", strategy);
  }
}

function getWinningStrategoryAgainst(strategy) {
  switch (strategy) {
    case "R":
      return "P";
    case "P":
      return "S";
    case "S":
      return "R";
    default:
      throw new Error("unrecognised strategy", strategy);
  }
}

function solvePartOne(data) {
  data = data.split("\n");
  let oppScore = 0,
    meScore = 0;
  data.forEach((row) => {
    let [opp, me] = row.split(" ").map((x) => translate(x.trim()));
    console.log(opp, me);
    if (opp === me) [oppScore, meScore] = [oppScore + 3, meScore + 3];
    else if (
      (opp === "R" && me === "S") ||
      (opp === "P" && me === "R") ||
      (opp === "S" && me === "P")
    )
      oppScore += 6;
    else meScore += 6;

    meScore += getScoreForStrategy(me);
  });
  console.log(meScore);
}

function solvePartTwo(data) {
  data = data.split("\n");
  let meScore = 0;

  data.forEach((row) => {
    let [oppStrategy, meOutcome] = row
      .split(" ")
      .map((x) => x.trim())
      .map((x, i) => (i === 0 ? translate(x) : x));
    console.log(oppStrategy, meOutcome);
    if (meOutcome === "Y") {
      meScore += getScoreForStrategy(oppStrategy);
      meScore += 3;
    } else if (meOutcome === "X") {
      meScore += getScoreForStrategy(getLosingStrategoryAgainst(oppStrategy));
    } else if (meOutcome === "Z") {
      meScore += getScoreForStrategy(getWinningStrategoryAgainst(oppStrategy));
      meScore += 6;
    }
  });
  console.log(meScore);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
