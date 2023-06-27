
import { useEffect, useState } from 'react';
import { logouts } from "../../service/getservice";
import {collection,query, onSnapshot, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../firebase"
import { Link } from 'react-router-dom';

function Header({userdata}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [menu, setMenu] = useState(false);
  const logout = () => {
    logouts()
    navigate("/");
    alert('로그아웃 되었습니다');
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
  
  
  // const nickname = users&&users.map((i) => {
  //   if (i.email.value === userdata.email.value) {
  //     return i.displayName;
  //   } else {
  //     console.log('반환값 없음');
  //     return null; // 또는 다른 기본 값을 반환
  //   }
  // }).filter(value => value !== null && value !== '');


  return (
  <div className="divbox">
    <div  className='menubtn' onClick={e=>setMenu(!menu)}>메뉴</div>
    {menu?
    <ul className='menu' >
      <li onClick={e=>setMenu(!menu)}>
        <Link to={'/Mychallenges'}>내가참여한챌린지</Link>
      </li>
      <li onClick={e=>setMenu(!menu)}>
        <Link to={'/MyProfile'}>내정보변경</Link>
      </li>
    </ul>
    :''
    }
    <a href="/">헤더입니다</a>
    {userdata? 
    <>
      {/* <div>{nickname} 님 </div> */}
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
