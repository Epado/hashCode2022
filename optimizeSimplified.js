/**
 *
 * @param {*} devs
 * @param {[{name: str, bestBefore: int, duration: int, fullScore: int, actualScore: int, reqSkills: [{ name: str, initLv: int, actLv: int }]}]} projects
 * @returns
 */
export default function optimizeSimplified(devs, projects) {
  let projectsCompleted = [];

  const orderedProject = projects.sort(
    (pr1, pr2) => pr1.duration - pr2.duration
  );
  console.log(orderedProject);

  return projectsCompleted;
}
