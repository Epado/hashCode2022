"use strict";
// const fs = require("fs");
import get from "./input.js";
import write from "./output.js"
import optimizeSimplified from "./optimizeSimplified"

const index = function () {
  const fileName = process.argv.pop();
  const { devs, projects } = get(fileName);

/*   const projectsCompleted = [
    { name:'logging', roles: ['Anna', 'Bob'] },
    { name:'server', roles: ['Anna'] }
  ] */
  const projectsCompleted = optimizeSimplified(devs, projects)
  write(projectsCompleted, 'pippo.txt')
};

index();
