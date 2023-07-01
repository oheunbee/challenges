import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { calculateWeeksAhead } from "../service/getservice";

const Challenge =  ({userdata}) => {
    let navigate = useNavigate();
    const [content, setContent] = useState({});
    const location = useLocation();
    const path = location.pathname.split('/')[2]
    const [array, setArray]=useState([])
    useEffect(() => {
        const q1 = query(collection(dbService, 'challenges'));
        const q2 = query(collection(dbService, 'challengejoin'));
      
        const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
          const allChallenges = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }).find((doc) => {
            return doc.id === path;
          });
      
          if (allChallenges) {
            setContent(allChallenges);
          }
        });
      
        const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
          const allChallenges = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }).filter((value) => value.userId === userdata.uid);
      
          if (allChallenges) {
            setArray(allChallenges);
          }
        });
      
        return () => {
          unsubscribe1();
          unsubscribe2();
        };
      }, []);
      console.log(array, '어레이');
      console.log(content, 'content');


    // 삭제 - D
    const deleteUser = async(id) =>{
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(dbService, "challenges", id);
    // deleteDoc을 이용해서 삭제
    await deleteDoc(userDoc);
    console.log(id)
    navigate("/");
    }

    // 로그인 안 되어있다면 메인으로 이동
 

    return(
        <>
        {content ? 
        <ul>
            <li>챌린지 그룹명 : {content.title}</li>
            <li>그룹원(명수) : {content.members}</li>
            <li>챌린지 주차 : {content.challengeWeeks}</li>
            <li>현재 주차 : {calculateWeeksAhead(content.startDate)} </li>
            <li>시작일 : {content.startDate}</li>
            <li>종료일 : {content.endDate}</li>
            <button onClick={()=>{
            deleteUser(content.id)
            }}>삭제</button>
            <Link to={`/NewWrite/${content.id}`}>수정</Link>
            <br></br>
            <br></br>
        </ul>
        :'loading....'    
        }

        {array.find(item => item.challenge === path)&&array ? 
        <Link to={`/JoinChallenge/${content.id}`} > 
        <div>"{content.title}" 챌린지 상세페이지로 이동</div>
        </Link> 
        : 
        <Link to={`/ChallDetail/${content.id}`} > 
        <div >자세히 알아보기</div>
        </Link> }

        </>

    )
}


export default Challenge;