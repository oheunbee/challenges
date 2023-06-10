import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot} from "firebase/firestore";
import { useLocation } from "react-router";

const Challenge =  () => {
    const [content, setContent] = useState()
    const location = useLocation();
        const path = location.pathname.split('/')[2]
        useEffect(() => {
            const q = query(collection(dbService, 'challenges'));
            //const q = query(collection(dbService, 'challenges'), where("id", "==", path), limit(1));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const allChallenges = querySnapshot.docs.find((doc) => {
                    return doc.id === path;
                  });
                  
                  if (allChallenges) {
                    setContent(allChallenges.data());
                  }
              })
              return () => {
                unsubscribe()
              }
          }, []);
    console.log(content,'content')
    return(
        <>
        {content ? 
        <div>
            <div>title : {content.title}</div>
            <div>subtitle : {content.subtitle}</div>
        </div>
    :'loading....'    
    }
        </>

    )
}


export default Challenge;