import { dbService, storageService} from "../firebase";
import React, { useEffect, useState, useRef} from "react";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { calculateWeeksAhead } from "../service/getservice";
import Challengebox from "./Challengebox";
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
          <Challengebox values={value}/>
        )
     }
     </>
    )
}

export default Main;