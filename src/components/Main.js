import { dbService, storageService} from "../firebase";
import React, { useEffect, useState, useRef} from "react";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";

const Main =  () => {
    const [challenges, setChallenges] = useState();
    
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
     {
        challenges&&challenges.map(value =><div key={value.title}>{value.title}</div>)
     }
     </>
    )
}

export default Main;