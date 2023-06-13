import { dbService, storageService} from "../firebase";
import React, { useEffect, useState, useRef} from "react";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
const Main =  () => {
    const [challenges, setChallenges] = useState();
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
        <div> {value.title} </div> 
        </Link>)
     }
     </>
    )
}

export default Main;