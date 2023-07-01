
import { authService, dbService } from "../firebase";
export const logouts = ()=>{
    authService.signOut()
}
const today = new Date(); // 현재 날짜와 시간을 가져옴
export const calculateWeeksAhead = (targetDate)=>{

    var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
let result = year + '-' + month + '-' + day;
    const reference = new Date(result);
    const target = new Date(targetDate);
  
    const timeDiff = target.getTime() - reference.getTime();
    const weeksDiff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
    return weeksDiff;
  }
export const nowWeeks = (targetDate)=>{

const referenceDate = new Date(targetDate); // 기준 날짜를 설정

// 오늘과 기준 날짜 간의 차이를 계산 (밀리초 단위)
const timeDiff = today.getTime() - referenceDate.getTime();

// 차이를 주 단위로 변환
const weeksPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
return weeksPassed+1;
}