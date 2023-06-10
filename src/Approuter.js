
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import Challenge from "./components/Challenge";
import Masterwrite from "./components/Masterwrite";
const Approuter =  () => {
    
    return(
      <div className="contain">
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/Challenge/:id" element={<Challenge/>}/>
                <Route path="/Masterwrite" element={<Masterwrite/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    )
}

export default Approuter;