import { dbService, storageService} from "../firebase";
import React, { useEffect, useState, useRef} from "react";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
const Main =  () => {
    const [challenges, setChallenges] = useState();
    const navigate = useNavigate();
    console.log(challenges,'c')
    useEffect(() => {
      const q = query(collection(dbService, 'challenges'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChallenges = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setChallenges(allChallenges);
    })
    return () => {
        unsubscribe()
      }
    }, []);
  

    return(
    <>
    <a href="/Masterwrite">작성</a>
    <br></br>
     {
        challenges&&challenges.map(value =>
        <Link
        to={`/Challenge/${value.id}`}  
        key={value.id}>

        <ul  className='box-border h-1/4 w-1/2 p-4 border-4' >
          <li>
            <div>{value.title} 챌린지</div>
            <div>
              <div>
              <img></img>
              </div>
              <ul>
                <li>챌린지 그룹명 : {value.subtitle}</li>
                <li>그룹원(명수) : {value.members}</li>
                <li>챌린지 주차 : {value.challengeWeeks}</li>
                <li>현재 주차 : </li>
                <li>시작일 : {value.startDate}</li>
                <li>종료일 : {value.endDate}</li>
              </ul>
            </div>
            
          </li> 
        </ul>

        </Link>
        )
     }
     </>
    )
}

export default Main;