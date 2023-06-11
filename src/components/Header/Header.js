
import { logouts } from "../../service/getservice";
import { useNavigate } from "react-router-dom";

function Header({userdata}) {
  const navigate = useNavigate();
  const logout = () => {
    logouts().then(() => {
      navigate("/");
      alert('로그아웃 되었습니다');
    }).catch((error) => {
      console.log('로그아웃 에러:', error);
    });
  };
  return (
  <div className="divbox">
    <div>메뉴</div>
    <a href="/">헤더입니다</a>
    {userdata? 
    <button onClick={logout}>로그아웃</button>
    :
    <a href='/Login'>로그인</a>
    }
  
    
    
  </div>
  );
}

export default Header;
