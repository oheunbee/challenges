
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Masterwrite from "./components/Masterwrite";
import Join from "./components/Join";
import Login from "./components/Login";
import NewWrite from './components/NewWrite';
import ChallDetail from './components/ChallDetail';
import Mychallenges from "./components/Mychallenges";
import MyProfile from "./components/MyProfile";
import JoinChallenge from "./components/JoinChallenge";

const Approuter =  ({userdata, isLoggedIn}) => {
    
  // context(state보관함)를 만들어주는 함수
  

    return(
      <div className="contain">
        <BrowserRouter>
        <Header userdata={userdata}/>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/NewWrite/:id" element={<NewWrite />} />
                <Route path="/Challenge/:id" element={<Challenge userdata={userdata} />}/>
                <Route path="/ChallDetail/:id" element={<ChallDetail userdata={userdata} />}/>
                <Route path="/Masterwrite" element={<Masterwrite/>}/>
                <Route path="/Join" element={<Join/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Mychallenges" element={<Mychallenges userdata={userdata}/>}/>
                <Route path="/MyProfile" element={<MyProfile userdata={userdata}/>}/>
                <Route path="/JoinChallenge/:id" element={<JoinChallenge userdata={userdata}/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default Approuter;