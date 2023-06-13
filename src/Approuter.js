
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Masterwrite from "./components/Masterwrite";
import Join from "./components/Join";
import Login from "./components/Login";
import NewWrite from './components/NewWrite';
const Approuter =  ({userdata, isLoggedIn}) => {
    
    return(
      <div className="contain">
        <BrowserRouter>
        <Header userdata={userdata}/>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/NewWrite" element={<NewWrite />} />
                <Route path="/Challenge/:id" element={<Challenge />}/>
                <Route path="/Masterwrite" element={<Masterwrite/>}/>
                <Route path="/Join" element={<Join/>}/>
                <Route path="/Login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default Approuter;