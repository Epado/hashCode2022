"use strict";
// const fs = require("fs");
import get from "./input.js";

// rowsConfiguration is an already formatted strinf
const writeFile = function (path, rowsConfiguration) {
  try {
    fs.writeFileSync(path, rowsConfiguration);
  } catch (err) {
    console.error(err);
  }
};

const stringify = function (s) {
  let resString = "";
  for (let i = 0; i < s.length; i++) {
    let elem = s[i];
    elem = typeof elem === "string" ? elem : elem.join(" ");
    resString += elem + "\n";
  }
  return resString;
};

const readFile = function (path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    let row = data
      .split("\n")
      .filter((elem) => elem)
      .map((elem) => elem.split(" "));
    const rowInt = row.map((elem) => elem.map((e) => parseInt(e)));
    const [rows, slots, unavail, pool, servers] = rowInt[0];
    const structure = {
      rows,
      slots,
      unavail,
      pool,
      servers,
      unavail_coord: [],
      servers_numbers: [],
    };
    for (let i = 0; i < unavail; i++) {
      structure.unavail_coord.push(rowInt[1 + i]);
    }
    let server_index = 0;
    for (let i = unavail; i < rowInt.length - 1; i++) {
      structure.servers_numbers.push([...rowInt[1 + i], server_index]);
      server_index++;
    }
    return structure;
  } catch (err) {
    console.error(err);
  }
};

const isMatching = function (server, row, col, unavail_coord, max_cols) {
  const server_size = server[0];
  if (col + server_size > max_cols) {
    return false;
  }
  const filtered_unavail_coord = unavail_coord.filter(
    (elem) => elem[0] === row
  );
  for (let coord = 0; coord < filtered_unavail_coord.length; coord++) {
    const y_unavailable = filtered_unavail_coord[coord][1];
    if (y_unavailable < server_size + col && y_unavailable >= col) {
      return false;
    }
  }
  return true;
};

const isUnavailable = function (row, col, unavail_coord) {
  const coord = unavail_coord.filter(
    (elem) => elem[0] === row && elem[1] === col
  );
  return coord.length > 0;
};

const runOptimization = function (structure) {
  let optimization = [];
  structure.servers_numbers = structure.servers_numbers.sort(
    (first, second) => {
      return second[1] - first[1];
    }
  );

  let pool = 0;
  const getPool = function (max_pool) {
    pool++;
    if (pool >= max_pool) {
      pool = 0;
    }
    return pool;
  };
  for (let row = 0; row < structure.rows; row++) {
    for (let col = 0; col < structure.slots; col++) {
      if (!isUnavailable(row, col, structure.unavail_coord)) {
        const server = structure.servers_numbers.shift();
        if (server) {
          if (
            isMatching(
              server,
              row,
              col,
              structure.unavail_coord,
              structure.slots
            )
          ) {
            optimization.push([row, col, getPool(structure.pool), server[2]]);
            col = col + server[0];
          } else {
            optimization.push(["x", server[2]]);
            col--;
          }
        } else {
          col--;
        }
      }
    }
  }
  for (let i = 0; i < structure.servers_numbers.length; i++) {
    const server = structure.servers_numbers.shift();
    optimization.push(["x", server[2]]);
  }

  optimization = optimization.sort((first, second) => {
    return first[first - 1] - second[second - 1];
  });
  optimization = optimization.map((elem) => {
    if (elem[0] === "x") {
      return elem[0];
    }
    return [elem[0], elem[1], elem[2]];
  });
  return optimization;
};

const index = function () {
  const fileName = process.argv.pop();
  const { devs, projects } = get(fileName);
  //   console.log({ devs, projects }); // OK
  devs.forEach((d) => console.log(d.skills));
  projects.forEach((d) => console.log(d.reqSkills));
  // fs.readdir('./inputFiles', (err, files) => {
  //     files.forEach(file => {
  //         const structure = readFile(`./inputFiles/${file}`)
  //         const optimization = runOptimization(structure)
  //         const result = stringify(optimization)
  //         writeFile(`${file}`, result)
  //     });
  // });
};

index();
