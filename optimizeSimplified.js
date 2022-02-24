function getSkillLv(dev, skillName) {
  const skill = dev.skills.find((s) => s.name === skillName);
  console.log({ skill });
  skill ? skill.actLv : 0;
}

/**
 * Ritorna i devs con le capacita` corrette per quel project.
 * @param {[ name: str, skills: [{ name: str, initLv: int, actLv: int }] ]} devs
 * @returns
 */
function getRightDevs(devs, project) {
  const toRet = [];
  const avDevs = [...devs];

  for (const skill of project.reqSkills) {
    const filtered = avDevs.filter((dev) => {
      return dev.skills.some((s) => {
        console.log({ skill, s });
        return s.name === skill.name && s.currentLv >= skill.lv;
      });
    }); // tra tutti quelli che hanno la skill
    console.log({ filtered });
    const sorted = filtered.sort(
      (dev1, dev2) =>
        getSkillLv(dev1, skill.name) - getSkillLv(dev2, skill.name) // ordinali in ordine crescente
    );
    console.log({ sorted });
    const chosenDev = sorted.shift();
    if (chosenDev) {
      toRet.push(chosenDev);
      avDevs.splice(
        avDevs.findIndex((d) => d.name === chosenDev.name),
        1
      );
      chosenDev.skills.find((s) => s.name === skill.name).currentLv++;
    } else return [];
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
  // console.log({ project: orderedProject[1], s: orderedProject[1].reqSkills });
  // const project = orderedProject[1];
  for (const project of orderedProject) {
    // console.log({ project });
    const rightDevs = getRightDevs(devs, project);
    // console.log({ rightDevs });
    if (rightDevs.length > 0) {
      const rightDevsNames = rightDevs.map((d) => {
        console.log(d);
        return d.name;
      });
      toRet.push({
        name: project.name,
        roles: rightDevsNames,
      });
    } else {
      // riaggiungo project alla lista
      orderedProject.push(project);
    }
  }

  console.log(toRet);
  return toRet;
}
