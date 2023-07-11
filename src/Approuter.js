
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Header,MHeader} from "./components/Header/Header";
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
import Writeweekchallenge from "./components/Writeweekchallenge";
import { PC,Tablet } from "./Mediaquery";
const Approuter =  ({userdata, isLoggedIn}) => {
 
    return(
      <div className="contain flex md:w-full">
        <BrowserRouter>
        <PC>
        <Header userdata={userdata}/>
        </PC>
        <Tablet>
        <MHeader userdata={userdata}/>
        </Tablet>
      
        
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
                <Route path="/Writeweekchallenge" element={<Writeweekchallenge userdata={userdata}/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default Approuter;