"use strict";
// const fs = require("fs");
import get from "./input.js";
import write from "./output.js"

const index = function () {
  const fileName = process.argv.pop();
  const { devs, projects } = get(fileName);

  const projectsCompleted = [
    { name:'logging', roles: ['Anna', 'Bob'] },
    { name:'server', roles: ['Anna'] }
  ]
  write(projectsCompleted, 'pippo.txt')
  //   console.log({ devs, projects }); // OK
  //   devs.forEach((d) => console.log(d.skills)); // OK
  //   projects.forEach((d) => console.log(d.reqSkills)); // OK
};

index();
