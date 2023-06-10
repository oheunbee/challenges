import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,query, onSnapshot,orderBy } from "firebase/firestore";


const Challenge =  () => {
    const [content, setContent] = useState()
    useEffect(()=>{
        const q = query(collection(dbService, 'challenges'), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const challenges = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        setContent(challenges);
      })
      return () => {
          unsubscribe()
        }
    },[])
    return(
     <div>apdls</div>
    )
}

export default Challenge;