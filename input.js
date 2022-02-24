import * as fs from "fs";
import {range} from './utils.js';

export default function getStructure(fileName) {
  const rows = fs.readFileSync(fileName, { encoding: "ascii" }).split("\n");
  const [numDevs, numProjects] = rows.shift().split(' ').map((s) => Number.parseInt(s));
  // { name: str, skills: [{ name: str, initLv: int, actLv: int }] }
  const devs = []
  for(const _ of range(numDevs)) {
    const [name, numSkills] = rows.shift().split(' ')
    // [{ name: str, initLv: int, actLv: int }]
    const skills = []
    for(const __ of range(Number(numSkills))) {
      const [name, lv] = rows.shift().split(' ')
      skills.push({name, initLv: Number(lv), currentLv: Number(lv)})
    }
    devs.push({name, skills})
  }

  // {name: str, bestBefore: int, duration: int, fullScore: int, reqSkills: [Skill]}
  const projects = []
  for(const _ of range(numProjects)) {

  }

  // const [first, ...everyThingElse] = rows.shift().split(" ");
  return [];
}
