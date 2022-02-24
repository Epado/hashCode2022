import * as fs from "fs";
import { range } from "./utils.js";

export default function writeResult(projectsCompleted, outfileName) {
  const porjectsNum = projectsCompleted.length.toString();
  let resString = porjectsNum + "\n";
  for (let idx = 0; idx < projectsCompleted.length; idx++) {
    const projectCompleted = projectsCompleted[idx];
    resString += projectCompleted.name;
    resString += "\n";

    resString += projectCompleted.roles.join(" ");
    if (idx !== projectsCompleted.length - 1) resString += "\n";
  }

  try {
    fs.writeFileSync(outfileName, resString);
    // console.log(resString);
  } catch (err) {
    console.error(err);
  }
}
