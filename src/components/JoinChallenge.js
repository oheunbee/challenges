import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { nowWeeks,getChallenge,getAllJoinChallenge } from "../service/getservice";

const JoinChallenge =  ({userdata}) => {
    let navigate = useNavigate();
    // 현재 페이지에 대한 정보 
    const [content, setContent] = useState({});
    const location = useLocation();
    const [num, setNum]=useState()
    const [cmembers,setcMemgers]=useState()
    const path = location.pathname.split('/')[2]
console.log(userdata,'userdata')
    useEffect(() => {
            getChallenge('challenges',path,setContent,true,setcMemgers)
          
    }, []);
    const onClick=(i)=>{
        if(num==i){
            setNum(null)
        }else{
        setNum(i)
        }
      }
    const renderListItems = (weeks) => {
        const listItems = [];
        for (let i = 0; i < weeks; i++) {
          const listInItems = renderMemberdiv(cmembers,i); // listInItems 변수 선언 및 초기화
          listItems.push(
            <li onClick={()=>onClick(i)} key={i}>
              <div>
                <div>{i + 1}주</div>
                <div>주제</div>
                <div>총 00%</div>
              </div>
              {num === i ? listInItems : null} 
            </li>
          );
        }
        return listItems;
      };
      
      const renderMemberdiv = (members,i) => {
        return(
            <>
            {members&&members.map(value=>
                <div>
                <div>{value.userId}</div>
                <div>진행하기로 한거</div>
                <div>실행내용</div>
                <div>해낸분량</div>
                {i == nowWeeks(content.startDate)-1 &&userdata.uid==value.userId?
                <Link>작성</Link>
                :''
            }
              </div>)}
            </>
        )
      };
      
      const challengeWeeks = parseInt(content.challengeWeeks);
      const listItems = renderListItems(challengeWeeks);
      
    return(
        <>
        {content.id===path ? 
        <section>
            <div>
                <div>{content.title}</div>
                <div>참가인원 : {cmembers&&cmembers.length} 명</div>
            </div>

            <div>
                <span>시작일: {content.startDate}</span>
                <span>종료일: {content.endDate}</span>
            </div>
            <div>현재주차 :  <div>{nowWeeks(content.startDate)}주</div></div>

            {/* ul이 한세트인데 이게 n주차만큼 자동생성되도록 만들어야 함 */}
            <ul >
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