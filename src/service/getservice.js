
import { authService, dbService } from "../firebase";
export const logouts = ()=>{
    authService.signOut()
}

export const calculateWeeksAhead = (targetDate)=>{
    const today = new Date();
    var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
let result = year + '-' + month + '-' + day;
    const reference = new Date(result);
    const target = new Date(targetDate);
  
    const timeDiff = target.getTime() - reference.getTime();
    const weeksDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
  console.log(weeksDiff,'weeksDiff')
    return weeksDiff;
  }