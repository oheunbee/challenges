
import { useEffect, useState } from 'react';
import { logouts } from "../../service/getservice";
import {collection,query, onSnapshot, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../firebase"

function Header({userdata}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const logout = () => {
    logouts().then(() => {
      navigate("/");
      alert('로그아웃 되었습니다');
    }).catch((error) => {
      console.log('로그아웃 에러:', error);
    });
  };
  console.log(userdata);
  useEffect(()=> {
    const nick = query(collection(dbService,'users'));
    const userData = onSnapshot(nick, (querySnapshot) => {
      const allUser = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
        })
        setUsers(allUser);
      })
    
    return () => {
      userData()
    }
  },[])
  
  
  const nickname = users.map((i) => {
    if (i.email.value === userdata.email.value) {
      return i.displayName;
    } else {
      console.log('반환값 없음');
      return null; // 또는 다른 기본 값을 반환
    }
  }).filter(value => value !== null && value !== '');


  return (
  <div className="divbox">
    <div >메뉴</div>
    <a href="/">헤더입니다</a>
    {userdata? 
    <>
      <div>{nickname} 님 </div>
      <br></br>
      <button onClick={logout}>로그아웃</button>
    </>
    :
    <a href='/Login'>로그인</a>
    }
    
    
    
    
  </div>
  );
}

export default Header;
