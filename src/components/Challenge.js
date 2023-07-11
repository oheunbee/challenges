import { useEffect,useState } from "react";
import { dbService} from "../firebase";
import {collection,query, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { nowWeeks,getAllJoinChallenge,getImageUrl } from "../service/getservice";

const Challenge =  ({userdata}) => {
    let navigate = useNavigate();
    const [content, setContent] = useState({});
    const [array, setArray]=useState([])
    const [imageurl, setImageurl] = useState(null)
    const [member, setMember] =useState('')
    const [open, setOpen] =useState(false)
    const location = useLocation();
    const path = location.pathname.split('/')[2]
     console.log(content,'content')
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
            getAllJoinChallenge(allChallenges.id,setMember)
            getImageUrl(allChallenges.imageUrl,setImageurl)
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
        <div className="wrapbox w-full">
        <div className="banner_wrap relative w-full pb-8">
          <div className="banner w-full h-48 mb-4">
            <img className="w-full " src={imageurl}/>
          </div>
          <div className="banner_b">
            <div className="banner_t font-bold text-xl">{content.title}</div>
            <div className="text-xs text-zinc-700 mb-5">호스트 {content.userid}</div>
            <div className="text-base text-zinc-700">{content.subtitle}</div>
            <div className="flex">
              <div className="text-sm text-zinc-700 mr-3">그룹원(명수) : {member.length+1}명</div>
              <div className="text-sm text-zinc-700 mr-3">시작일 : {content.startDate}</div>
              <div className="text-sm text-zinc-700">종료일 : {content.endDate}</div>

            </div>
          </div>
        </div>
        {content ? 
        <ul>
           <li className="text-gray-500 mb-5">
           {content.content&&content.content.split("\n").map((line) => { //this.props.data.content: 내용
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
           </li>
           <ul className="flex">
            <li className="mr-5 text-zinc-700">챌린지 주차 : {content.challengeWeeks}주차</li>
            <li className="mr-5 text-zinc-700">현재 주차 : {nowWeeks(content.startDate)}주차 </li>
          </ul>
            <li>
            <ul  className="mt-10">
              <li className="font-bold text-xl">참여중인 명단</li>
              <li>{content.userid}</li>
              {member&&member.map(value=><li key={value.id}>{value.id}</li>)}
            </ul>
            </li>
            <button onClick={()=>{
            deleteUser(content.id)
            }}>삭제</button>
            <Link to={`/NewWrite/${content.id}`}>수정</Link>
            <br></br>
            <br></br>
        </ul>
        :'loading....'    
        }

        {array.find(item => item.challenge === path)&&array || userdata.uid === content.userid? 
        <Link to={`/JoinChallenge/${content.id}`} > 
        <div>"{content.title}" 챌린지 상세페이지로 이동</div>
        </Link> 
        : 
        <Link to={`/ChallDetail/${content.id}`} > 
        <div >자세히 알아보기</div>
        </Link> }

        </div>

    )
}


export default Challenge;