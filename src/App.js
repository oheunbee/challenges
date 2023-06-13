import { useState, useEffect } from "react";
import Approuter from "./Approuter";
import { updateProfile } from "@firebase/auth";
import { authService, dbService } from "./firebase";
import { onSnapshot,collection,query} from "firebase/firestore"
import './style.css'
function App() {
  const [init, setInit] = useState(false)
   const [userdata, setUserdata] = useState()
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserdata({
          displayName: user.displayName,
          uid: user.uid,
          email : user.email,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        })
      }else{
        setUserdata(null)  
      }
      setInit(true)
    
    })
    
  },[])
  return (
    <>
    {init ? <Approuter isLoggedIn={Boolean(userdata)} userdata={userdata}/> : "Initializing...."}
    </>

    
  );
}

export default App;
