"use strict";
let utils = require("./utils");

function notTouching(head, tail) {
  return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
}

function notInSameRowOrColumn(head, tail) {
  return head.x !== tail.x && head.y !== tail.y;
}

function getStringOfTail(tail) {
  return tail.x.toString() + "." + tail.y.toString();
}

function move(
  head,
  tail,
  tailUniquePositions,
  count,
  mainDirection,
  otherDirection,
  posOrNegDirection
) {
  console.log("moving");
  while (count-- > 0) {
    //head.y--;
    head[mainDirection] += posOrNegDirection * 1;
    if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
      // move diagonally towards head
      //tail.y--;
      tail[mainDirection] += posOrNegDirection * 1;
      // if (head.x > tail.x) tail.x++;
      // else tail.x--;
      if (head[otherDirection] > tail[otherDirection])
        tail[otherDirection] += posOrNegDirection * -1;
      else tail[otherDirection] += posOrNegDirection * 1;
    } else if (notTouching(head, tail)) {
      tail[mainDirection] += posOrNegDirection * 1;
      //tail.y--;
    }
    if (!tailUniquePositions.includes(getStringOfTail(tail)))
      tailUniquePositions.push(getStringOfTail(tail));
    console.log("head:", head, "tail:", tail);
  }
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
        move(head, tail, tailUniquePositions, count, "x", "y", 1);
        // while (count-- > 0) {
        //   head.x++;
        //   if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
        //     // move diagonally towards head
        //     tail.x++;
        //     if (head.y > tail.y) tail.y++;
        //     else tail.y--;
        //   } else if (notTouching(head, tail)) {
        //     tail.x++;
        //   }
        //   if (!tailUniquePositions.includes(getStringOfTail(tail)))
        //     tailUniquePositions.push(getStringOfTail(tail));
        //   console.log("head:", head, "tail:", tail);
        // }
        break;

      case "L":
        move(head, tail, tailUniquePositions, count, "x", "y", -1);
        // while (count-- > 0) {
        //   head.x--;
        //   if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
        //     // move diagonally towards head
        //     tail.x--;
        //     if (head.y > tail.y) tail.y++;
        //     else tail.y--;
        //     // mark grid
        //   } else if (notTouching(head, tail)) {
        //     tail.x--;
        //   }
        //   if (!tailUniquePositions.includes(getStringOfTail(tail)))
        //     tailUniquePositions.push(getStringOfTail(tail));
        //   console.log("head:", head, "tail:", tail);
        // }
        break;

      case "U":
        move(head, tail, tailUniquePositions, count, "y", "x", -1);
        // while (count-- > 0) {
        //   head.y--;
        //   if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
        //     // move diagonally towards head
        //     tail.y--;
        //     if (head.x > tail.x) tail.x++;
        //     else tail.x--;
        //     // mark grid
        //   } else if (notTouching(head, tail)) {
        //     tail.y--;
        //   }
        //   if (!tailUniquePositions.includes(getStringOfTail(tail)))
        //     tailUniquePositions.push(getStringOfTail(tail));
        //   console.log("head:", head, "tail:", tail);
        // }
        break;
      case "D":
        move(head, tail, tailUniquePositions, count, "y", "x", 1);
        // while (count-- > 0) {
        //   head.y++;
        //   if (notTouching(head, tail) && notInSameRowOrColumn(head, tail)) {
        //     // move diagonally towards head
        //     tail.y++;
        //     if (head.x > tail.x) tail.x++;
        //     else tail.x--;
        //     // mark grid
        //   } else if (notTouching(head, tail)) {
        //     tail.y++;
        //   }
        //   if (!tailUniquePositions.includes(getStringOfTail(tail)))
        //     tailUniquePositions.push(getStringOfTail(tail));
        //   console.log("head:", head, "tail:", tail);
        // }
        break;

      default:
        break;
    }
  });
  console.log(tailUniquePositions.length);
}

function solvePartTwo(data) {}

let nullFn = () => null;
utils.solve(__filename, solvePartOne, nullFn, true);
//utils.solve(__filename, nullFn, solvePartTwo, true);
