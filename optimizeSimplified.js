function getSkillLv(dev, skillName) {
  const skill = dev.skills.find((s) => s.name === skillName);
  console.log("SKILL");
  console.log(skill);
  console.log("END SKILL");
  skill ? skill.actLv : 0;
}

/**
 *
 * @param {[ name: str, skills: [{ name: str, initLv: int, actLv: int }] ]} devs
 * @returns
 */
function getRightDevs(devs, project) {
  const avDevs = [...devs];
  const toRet = [];
  for (const skill of project.reqSkills) {
    const filtered = avDevs.filter((dev) =>
      dev.skills.some((s) => s.name === skill.name && s.actLv >= skill.lv)
    ); // tra tutti quelli che hanno la skill
    console.log({ filtered });
    const sorted = filtered.sort(
      (dev1, dev2) =>
        getSkillLv(dev1, skill.name) - getSkillLv(dev2, skill.name) // ordinali in ordine crescente
    );
    console.log({ sorted });
    const chosenDev = sorted.shift();
    toRet.push(chosenDev);
    avDevs.slice(
      avDevs.findIndex((d) => d.name === chosenDev.name),
      1
    );
  }
  return toRet;
}

/**
 *
 * @param {[ name: str, skills: [{ name: str, initLv: int, actLv: int }] ]} devs
 * @param {[{name: str, bestBefore: int, duration: int, fullScore: int, actualScore: int, reqSkills: [{ name: str, initLv: int, actLv: int }]}]} projects
 * @returns
 */
export default function optimizeSimplified(devs, projects) {
  const orderedProject = projects.sort(
    (pr1, pr2) => pr1.duration - pr2.duration
  );
  const toRet = [];
  for (const project of orderedProject) {
    const rightDevs = getRightDevs(devs, project);
    console.log({ rightDevs });
    const rightDevsNames = rightDevs.map((d) => {
      console.log(d);
      return d.name;
    });
    toRet.push({
      name: project.name,
      roles: rightDevsNames,
    });
  }
  console.log(toRet);
  return toRet;
}
