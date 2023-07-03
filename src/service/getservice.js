
import { authService, dbService } from "../firebase";

import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
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
  
    const timeDiff = reference.getTime()- target.getTime();
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

export const getAllJoinChallenge = (title,seconfunc)=>{
  console.log(title,'title')
  const q = query(collection(dbService, 'challengejoin'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChallenges = querySnapshot.docs.map((doc) => {
          return {
              id : doc.id,
              ...doc.data(),
          }
        }).filter(value=>value.challenge===title)
        if (allChallenges) {
         seconfunc(allChallenges)
        }
    })
   
    return () => {
      unsubscribe()
    }
}
export const getWeekChallenge = (challenge,func)=>{

  const q = query(collection(dbService, 'weekchallenge'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChallenges = querySnapshot.docs.map((doc) => {
          return {
              id : doc.id,
              ...doc.data(),
          }
        }).filter(value=>value.challenge===challenge)
        if (allChallenges) {
          func(allChallenges)
        }
    })
   
    return () => {
      unsubscribe()
    }
}
export const getChallenge = (db,paths,func,length,seconfunc,sec,thir)=>{
  const q = query(collection(dbService, db));
  //const q = query(collection(dbService, 'challenges'), where("id", "==", path), limit(1));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChallenges = querySnapshot.docs.map((doc) => {
          return {
              id : doc.id,
              ...doc.data(),
          }
          }).find((doc) => {
          return doc.id === paths;
          });
          
          if (allChallenges) {
            func(allChallenges);
            if(length==true){
              getAllJoinChallenge(allChallenges.id,seconfunc);
              getWeekChallenge(allChallenges.id,thir)
            }else if(sec==true){
              seconfunc(allChallenges)
            }
           
          }
      })
      return () => {
      unsubscribe()
      }
}

