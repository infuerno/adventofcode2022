"use strict";
let utils = require("./utils");

function notTouching(head, tail) {
  return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
}

function notInSameRowOrColumn(head, tail) {
  return head.x !== tail.x && head.y !== tail.y;
}

function inSameRow(head, tail) {
  return head.y === tail.y;
}

function getStringOfTail(tail) {
  return tail.x.toString() + "." + tail.y.toString();
}

function moveKnots(head, knots, tail, tailUniquePositions) {
  knots.forEach((knot, i) => {
    let knotAhead = i === 0 ? head : knots[i - 1];
    if (notTouching(knotAhead, knot) && notInSameRowOrColumn(knotAhead, knot)) {
      // console.log(i + 1, "move diagonally");
      if (knotAhead.x > knot.x) knot.x++;
      else knot.x--;
      if (knotAhead.y > knot.y) knot.y++;
      else knot.y--;
    } else if (notTouching(knotAhead, knot)) {
      if (inSameRow(knotAhead, knot)) {
        //console.log(i + 1, "move horizontally");
        if (knotAhead.x < knot.x) knot.x--;
        else knot.x++;
      } else {
        // sameColumn
        //console.log(i + 1, "move vertically");
        if (knotAhead.y < knot.y) knot.y--;
        else knot.y++;
      }
    }
    if (!tailUniquePositions.includes(getStringOfTail(tail)))
      tailUniquePositions.push(getStringOfTail(tail));
    //console.log("head:", head, "tail:", tail);
  });
}

function solvePartOne(data) {
  data = data.trim().split("\n");
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  let tailUniquePositions = [getStringOfTail(tail)];
  console.log(tailUniquePositions);
  data.forEach((instruction) => {
    let [direction, count] = instruction.split(" ").map((x, i) => (i === 1 ? +x : x));
    console.log(direction, count);
    switch (direction) {
      case "R":
        while (count-- > 0) {
          head.x++;
          if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
            // move diagonally towards head
            tail.x++;
            if (head.y > tail.y) tail.y++;
            else tail.y--;
          } else if (notTouching(head, tail)) {
            tail.x++;
          }
          if (!tailUniquePositions.includes(getStringOfTail(tail)))
            tailUniquePositions.push(getStringOfTail(tail));
          console.log("head:", head, "tail:", tail);
        }
        break;

      case "L":
        while (count-- > 0) {
          head.x--;
          if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
            // move diagonally towards head
            tail.x--;
            if (head.y > tail.y) tail.y++;
            else tail.y--;
          } else if (notTouching(head, tail)) {
            tail.x--;
          }
          if (!tailUniquePositions.includes(getStringOfTail(tail)))
            tailUniquePositions.push(getStringOfTail(tail));
          console.log("head:", head, "tail:", tail);
        }
        break;

      case "U":
        while (count-- > 0) {
          head.y--;
          if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
            // move diagonally towards head
            tail.y--;
            if (head.x > tail.x) tail.x++;
            else tail.x--;
          } else if (notTouching(head, tail)) {
            tail.y--;
          }
          if (!tailUniquePositions.includes(getStringOfTail(tail)))
            tailUniquePositions.push(getStringOfTail(tail));
          console.log("head:", head, "tail:", tail);
        }
        break;

      case "D":
        while (count-- > 0) {
          head.y++;
          if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
            // move diagonally towards head
            tail.y++;
            if (head.x > tail.x) tail.x++;
            else tail.x--;
          } else if (notTouching(head, tail)) {
            tail.y++;
          }
          if (!tailUniquePositions.includes(getStringOfTail(tail)))
            tailUniquePositions.push(getStringOfTail(tail));
          console.log("head:", head, "tail:", tail);
        }
        break;

      default:
        break;
    }
  });
  console.log(tailUniquePositions.length);
}

function solvePartTwo(data) {
  data = data.trim().split("\n");
  let head = { x: 0, y: 0 };
  let knots = [];
  for (let i = 0; i < 9; i++) knots.push({ x: 0, y: 0 });
  let tail = knots[8];
  let tailUniquePositions = [getStringOfTail(tail)];
  console.log(tailUniquePositions);
  data.forEach((instruction) => {
    let [direction, count] = instruction.split(" ").map((x, i) => (i === 1 ? +x : x));
    console.log(direction, count);
    switch (direction) {
      case "R":
        while (count-- > 0) {
          head.x++;
          moveKnots(head, knots, tail, tailUniquePositions);
        }
        break;

      case "L":
        while (count-- > 0) {
          head.x--;
          moveKnots(head, knots, tail, tailUniquePositions);
        }
        break;

      case "U":
        while (count-- > 0) {
          // console.log("head move up");
          head.y--;
          moveKnots(head, knots, tail, tailUniquePositions);
        }
        break;

      case "D":
        while (count-- > 0) {
          head.y++;
          moveKnots(head, knots, tail, tailUniquePositions);
        }
        break;

      default:
        break;
    }
    console.log("h", head, ", knots", knots);
  });
  console.log(tailUniquePositions.length);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, true);
utils.solve(__filename, nullFn, solvePartTwo, false);
