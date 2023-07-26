
import { authService, dbService } from "../firebase";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import {collection,limit,query,getDocs, onSnapshot, deleteDoc, doc} from "firebase/firestore";
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
  
    const timeDiff = reference.getTime()- target.getTime() - reference.getTime();
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



export const getAllJoinChallenge = async (title, secondfunc) => {
  const q1 = query(collection(dbService, 'challengejoin'));
  const q2 = query(collection(dbService, 'users'));

  try {
    const snapshot1 = await getDocs(q1);
    const snapshot2 = await getDocs(q2);

    const allChallenges1 = snapshot1.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    }).filter(value => value.challenge === title);

    const allChallenges2 = snapshot2.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });

    const addNickToItemList = allChallenges1.map((item) => {
      const foundObj = allChallenges2.find((obj) => obj.email === item.email);
      console.log(foundObj, '??????foundobj');
      const nick = foundObj ? foundObj.displayName : null;
      return { ...item, nick };
    });
console.log(addNickToItemList,'addNickToItemList????')
    secondfunc(addNickToItemList);
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};
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

export const getImageUrl = async (value,func) => {
  const storage = getStorage();
  const storageRef = ref(storage);
  const imageRef = ref(storageRef, value);
try {
  const url = await getDownloadURL(imageRef);
  func(url);
} catch (error) {
  console.log('이미지 URL을 가져오는 중에 오류가 발생했습니다:', error);
}
};

// 닉네임으로 치환 
export const nickChange = async (data,setNick) => {
  const q = query(collection(dbService,`users`));
  onSnapshot(q, (querySnapshot) => {
    const allChallenges = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
      setNick(allChallenges.find(value=>value.id===data));
  });
};
