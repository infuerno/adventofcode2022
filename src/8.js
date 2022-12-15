"use strict";
let utils = require("./utils");

function allTreesBeforeAreShorter(row, i) {
  let height = row[i].height;
  while (i-- > 0) if (row[i].height >= height) return false;
  return true;
}

function allTreesAfterAreShorter(row, i) {
  let height = row[i].height;
  while (i++ < row.length - 1) if (row[i].height >= height) return false;
  return true;
}

function markVisibleTreesFromLeftOrRight(trees) {
  //console.log("BEFORE", trees);
  trees.forEach((row) => {
    row.forEach((tree, i) => {
      if (tree.visible) return;
      // ends are visible
      if (i === 0 || i === row.length - 1) tree.visible = true;
      else if (allTreesBeforeAreShorter(row, i) || allTreesAfterAreShorter(row, i)) {
        tree.visible = true;
      }
    });
  });
  //console.log("AFTER", trees);
}

function solvePartOne(data) {
  let trees = data.split("\n").map((row) =>
    Array.from(row).map((x) => ({
      visible: false,
      height: +x,
    }))
  );

  markVisibleTreesFromLeftOrRight(trees);
  console.log("transpose ...");
  for (let x = 0; x < trees[0].length; x++) {
    for (let y = x; y < trees.length; y++) {
      if (y === x) continue;
      [trees[x][y], trees[y][x]] = [trees[y][x], trees[x][y]];
    }
  }
  markVisibleTreesFromLeftOrRight(trees);

  const visible = trees.reduce((acc, row) => {
    return acc + row.reduce((acc, tree) => (tree.visible ? acc + 1 : acc), 0);
  }, 0);

  console.log(visible);
}

function solvePartTwo(data) {
  let trees = data.split("\n").map((row) => Array.from(row).map((x) => +x));
  console.log(trees);
  let width = trees[0].length;
  let height = trees.length;
  let maxScenicScore = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let tree = trees[y][x];
      // console.log("checking tree", x, y, tree);
      // trees to the left
      let scenicScoreLeft = 0;
      for (let col = x - 1; col >= 0; col--) {
        // console.log("checking left", col, y);
        scenicScoreLeft++;
        if (trees[y][col] >= tree) break;
      }
      // trees to the right
      let scenicScoreRight = 0;
      for (let col = x + 1; col < width; col++) {
        // console.log("checking right", col, y);
        scenicScoreRight++;
        if (trees[y][col] >= tree) {
          // console.log("break");
          break;
        }
      }
      let scenicScoreUp = 0;
      for (let row = y - 1; row >= 0; row--) {
        // console.log("checking left", col, y);
        scenicScoreUp++;
        if (trees[row][x] >= tree) break;
      }
      let scenicScoreDown = 0;
      for (let row = y + 1; row < height; row++) {
        // console.log("checking left", col, y);
        scenicScoreDown++;
        if (trees[row][x] >= tree) break;
      }
      let scenicScore = scenicScoreLeft * scenicScoreRight * scenicScoreUp * scenicScoreDown;
      console.log(
        x,
        y,
        tree,
        scenicScoreLeft,
        scenicScoreRight,
        scenicScoreUp,
        scenicScoreDown,
        scenicScore
      );
      maxScenicScore = Math.max(scenicScore, maxScenicScore);
    }
  }
  console.log("max", maxScenicScore);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
