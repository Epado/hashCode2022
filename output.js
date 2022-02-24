import * as fs from "fs";
import {range} from './utils.js';

/* projectsCompleted
- name 
- list of names 
 */
const stringify = function (s){
  let resString = ''
  for(let i = 0; i < s.length; i++){
      let elem = s[i]
      elem = typeof elem === 'string' ? elem : elem.join(" ")
      resString += (elem + '\n')
  }
  return resString
}

export default function writeResult(projectsCompleted, outfileName) {

  const porjectsNum = projectsCompleted.length.toString()
  let resString = porjectsNum + '\n'
  for(let idx=0; idx < projectsCompleted.length; idx++) {
    resString += projectCompleted.name
    resString += '\n'

    resString += projectCompleted.roles.join(' ')    
    if(idx !== (projectsCompleted.length -1)) resString += '\n'
  }

  try {
    fs.writeFileSync(outfileName, resString)   
  } catch (err) {
    console.error(err)
  }
}
