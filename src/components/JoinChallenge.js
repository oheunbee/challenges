import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"

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

    console.log(content,'content')
    console.log(userdata);

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

            {/* ul이 한세트인데 이게 n주차만큼 자동생성되도록 만들어야 함 */}
            <ul>
                <li>
                    <div>
                        <div>0주</div>
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
            </ul>
        </section>
        :'loading....'    
        }
        
        </>

    )
}


export default JoinChallenge;