"use strict";
let utils = require("./utils");

class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
  files = [];
  directories = [];
  get size() {
    return this.calculateSize();
  }
  calculateSize() {
    const fSize = this.files.reduce((acc, cur) => acc + cur.size, 0);
    const dSize = this.directories.reduce((acc, cur) => acc + cur.size, 0);
    return fSize + dSize;
  }
}

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

function getDirectories(data) {
  data = data.split("\n");
  let rootDirectory = new Directory("/", null);
  let currentDirectory = rootDirectory;
  let allDirectories = [rootDirectory];
  data.forEach((command) => {
    if (command.startsWith("$ cd ")) {
      const name = command.replace("$ cd ", "");
      if (name === "..") {
        currentDirectory = currentDirectory.parent;
      } else if (name === "/") {
        // nothing to do
      } else {
        const d = new Directory(name, currentDirectory);
        currentDirectory.directories.push(d);
        allDirectories.push(d);
        currentDirectory = d;
      }
    } else if (!command.startsWith("$ ls") && !command.startsWith("dir")) {
      const [size, name] = command.split(" ");
      const f = new File(name, +size);
      currentDirectory.files.push(f);
    }
  });
  return allDirectories;
}

function solvePartOne(data) {
  const allDirectories = getDirectories(data);
  let sum = allDirectories.reduce((acc, cur) => {
    let size = cur.size;
    console.log(cur.name, size);
    if (size <= 100000) return acc + size;
    else return acc;
  }, 0);
  console.log(sum);
}

function solvePartTwo(data) {
  const allDirectories = getDirectories(data);
  const rootDirectorySize = allDirectories[0].size;
  const totalSpace = 70000000;
  const freeSpace = totalSpace - rootDirectorySize;
  const requiredSpace = 30000000;
  const toBeDeleted = requiredSpace - freeSpace;
  console.log("to be deleted:", toBeDeleted);
  let smallest;
  allDirectories.forEach((d) => {
    let size = d.size;
    if (size >= toBeDeleted && (!smallest || size < smallest.size)) smallest = d;
  });
  console.log(smallest.name, smallest.size);
}

let nullFn = () => null;
//utils.solve(__filename, solvePartOne, nullFn, false);
utils.solve(__filename, nullFn, solvePartTwo, false);
