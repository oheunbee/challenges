import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { addDoc} from "firebase/firestore"
import { getChallenge } from "../service/getservice";

const ChallDetail =  ({userdata}) => {
    let navigate = useNavigate();
    const [content, setContent] = useState({});
    console.log(userdata,'???')
    const [joins, setJoins] = useState([]);
    const location = useLocation();
        const path = location.pathname.split('/')[2]
        useEffect(() => {
          if(!userdata) {
            alert('로그인을 해주세요');
            navigate('/login');
        }
        getChallenge('challenges',path, setContent)
           
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