import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { nowWeeks } from "../service/getservice";

const JoinChallenge =  ({userdata}) => {
    let navigate = useNavigate();
    const [content, setContent] = useState({});
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

    
const renderListItems = (weeks) => {
    const listItems = [];
    for (let i = 0; i < weeks; i++) {
      listItems.push(
        <li key={i}>
          <div>
            <div>{i + 1}주</div>
            <div>주제</div>
            <div>총 00%</div>
          </div>
          <ul>
            <li>
              <div>{userdata.displayName}</div>
              <div>해야 할 분량 이름</div>
              <div>00%</div>
            </li>
          </ul>
        </li>
      );
    }
    return listItems;
  };
  const challengeWeeks = parseInt(content.challengeWeeks);
const listItems = renderListItems(challengeWeeks);


    return(
        <>
        {content.id===path ? 
        <section>
            <div>
                <div>{content.title}</div>
                <div>참가인원 : {content.members} 명</div>
            </div>

            <div>
                <span>시작일: {content.startDate}</span>
                <span>종료일: {content.endDate}</span>
            </div>
            <div>현재주차 :  <div>{nowWeeks(content.startDate)}주</div></div>

            {/* ul이 한세트인데 이게 n주차만큼 자동생성되도록 만들어야 함 */}
            <ul>
            {listItems}
            </ul>
            {/* 요기까지가 한 세트, 주차 자동과 퍼센트 자동, userdata.displayName이 아니라 
            참여인원 명단대로 속 Ul의 li이가 자동생성 되어야 함 */}
        </section>
        :'loading....'    
        }
        
        </>

    )
}


export default JoinChallenge;