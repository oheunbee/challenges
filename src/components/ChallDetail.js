import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { addDoc} from "firebase/firestore"

const ChallDetail =  ({userdata}) => {
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
                }).find((doc) => {
                  return doc.id === path;
                });
                
                if (allChallenges) {
                  setContent(allChallenges);
                }
            })
            return () => {
              unsubscribe()
            }
        }, []);

      
const joinChallenge= async (event)=> {
  const joinObj = {
      challenge : path,
      userId : userdata.uid,
      createdAt: Date.now(),
      };
      await addDoc(collection(dbService, "challengejoin"), joinObj);
      alert('신청되었습니다')
      navigate('./JoinChallenge')
}

        console.log(content)
    return(
        <>
            <div>{content.title}</div>
            <div>현재참여자 : ㅇㅇ명</div>
            <div>참여하시겠습니까?</div>
            <div>
              <button onClick={joinChallenge}>확인</button>
              <Link>취소</Link>
            </div>
        </>

    )
}


export default ChallDetail;