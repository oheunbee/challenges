import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";

const Challenge =  () => {
    const navigate = useNavigate();
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

           // 삭제 - D
        const deleteUser = async(id) =>{
        // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
        const userDoc = doc(dbService, "challenges", id);
        // deleteDoc을 이용해서 삭제
        await deleteDoc(userDoc);
        console.log(id)
        navigate("/");
        }

    console.log(content,'content')
    return(
        <>
        {content ? 
        <ul>
            <li>챌린지 그룹명 : {content.title}</li>
            <li>그룹원(명수) : {content.members}</li>
            <li>챌린지 주차 : {content.challengeWeeks}</li>
            <li>현재 주차 : </li>
            <li>시작일 : {content.startDate}</li>
            <li>종료일 : {content.endDate}</li>
        </ul>
        :'loading....'    
        }
        <button onClick={()=>{
            deleteUser(content.id)
        }}>삭제</button>
        </>

    )
}


export default Challenge;