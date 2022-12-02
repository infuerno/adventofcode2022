// const axios = require("axios");
const fs = require("fs");
const os = require("os");

require("dotenv").config();

let onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

let getDataForDay = async (day) => {
  const SESSION_TOKEN = process.env.SESSION_TOKEN;
  if (!SESSION_TOKEN) {
    console.error("Session token not found, please check");
    return;
  }
  const YEAR = process.env.YEAR;
  if (!YEAR) {
    console.error("Year not found, please check");
    return;
  }

  try {
    const response = await fetch(`https://adventofcode.com/${YEAR}/day/${day}/input`, {
      headers: {
        Cookie: `session=${SESSION_TOKEN};`,
      },
    });
    //return response.data.split("\n").filter((x) => x != "");
    return await response.text();
  } catch (error) {
    console.error(error.response.data);
  }
};

exports.solve = async (filename, solvePartOne, solvePartTwo, useExample = false, exampleNumber = 1) => {
  let pathSeperator = os.platform().startsWith("win") ? "\\" : "/";
  let day = filename
    .split(__dirname + pathSeperator)
    .pop()
    .replace(".js", "");

  let file = `data${pathSeperator}${day}${
    useExample ? (exampleNumber == 1 ? "-example" : "-example-" + exampleNumber) : ""
  }.txt`;
  if (!fs.existsSync(file)) {
    if (useExample) {
      console.error(`Can't find example input ${file}, please create`);
      return;
    } else {
      console.log(`No local file found, downloading data for day: ${day}`);
      const data = await getDataForDay(day);
      fs.writeFileSync(file, data);
    }
  }
  console.log(`Using local data file ${file}`);

  const data = fs.readFileSync(file).toString().trim();
  console.log("Executing part one ...");
  solvePartOne(data);
  console.log("Executing part two ...");
  solvePartTwo(data);
};
