import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"

const ChallDetail =  () => {
    let navigate = useNavigate();
    const [content, setContent] = useState({});
    const [joins, setJoins] = useState([]);
    const location = useLocation();
        const path = location.pathname.split('/')[2]
        useEffect(() => {
            const q = query(collection(dbService, 'challenges'));
            //const q = query(collection(dbService, 'challenges'), where("id", "==", path), limit(1));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const allChallenges = querySnapshot.docs.map((doc) => {
                    return {
                        id : doc.id,
                        ...doc.data(),
                    }
                  });

                  if (allChallenges) {
                    setContent(allChallenges);
                  }
              })
              return () => {
                unsubscribe()
              }
            }, []);

            useEffect(() => {
            // joinr 불러오기
            const joiner = query(collection(dbService, 'joiner'));
            const joinerNames = onSnapshot(joiner, (querySnapshot) => {
                const allJoiner = querySnapshot.docs.map((doc) => {
                    return {
                        displayName : doc.displayName,
                        ...doc.data(),
                    }
                  })
                  
                  if (allJoiner) {
                    setJoins(allJoiner);
                  }
              })
              return () => {
                joinerNames()
              }
            },[])
          console.log(joins);
          console.log(content);



    return(
        <>
        <ul>
            <div>참가자 명단</div>
            {joins.map((item, index) => (
            <li key={index}>{item.displayName}</li>
            ))}
        </ul>
        </>

    )
}


export default ChallDetail;