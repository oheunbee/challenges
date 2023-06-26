import { dbService, storageService} from "../firebase";
import React, { useEffect, useState, useRef} from "react";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { calculateWeeksAhead } from "../service/getservice";
const Main =  () => {
    const [challenges, setChallenges] = useState();
    const [date, setDate] = useState([]);
    const navigate = useNavigate();

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
      });
    }, []);
    console.log(challenges,'c')    

    return(
    <>
    <a href="/Masterwrite">작성</a>
    <br></br>
     {
        challenges&&challenges.map(value =>

        <Link
        to={`/Challenge/${value.id}`}  
        key={value.id}>

        <ul  className='box-border h-1/4 w-3/4 p-4 border-4' >
          <li>
            <div>{value.title} 챌린지</div>
            <div className='flex ...'>
              <div className='flex-auto w-1/2 bg-sky-500/75 '>
                <img></img>
              </div>
              <ul className='flex-auto w-1/2'>
                <li>챌린지 그룹명 : {value.subtitle}</li>
                <li>그룹원(명수) : {value.members}</li>
                <li>챌린지 총 주차 : {value.challengeWeeks}</li>
                <li>현재 주차 :  {calculateWeeksAhead(value.startDate)}</li>
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