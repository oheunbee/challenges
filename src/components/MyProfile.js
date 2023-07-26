import { useEffect,useState } from "react";
import { authService, dbService, storageService} from "../firebase";
import {collection,query,where, doc, updateDoc,ref, setDoc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { updateProfile } from "@firebase/auth";


const MyProfile =  ({userdata}) => {
    let navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userdata.displayName)
    
    const [userdatas, setUserdatas] = useState(null)
    const refreshUser = () => {
        const user = authService.currentUser;
        console.log(user,'???user')
        setUserdatas({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
    }

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event) => {
       const { target : {value},
    } = event;
    setNewDisplayName(value);
    }
    const newNick = doc(dbService, 'users', userdata.email);
    console.log(newNick,'????')
    const onSubmit = async (event) => {
        event.preventDefault();
        const usersT = {
          email: userdata.email,
          displayName: newDisplayName,
          uid: userdata.uid,
        };
      
        if (userdata.displayName !== newDisplayName && newDisplayName !== '') {
          await updateProfile(authService.currentUser, { displayName: newDisplayName });
          refreshUser();
          // const userDocRef = doc(dbService, 'users', userdata.email);
  
          await setDoc(doc(dbService, 'users',userdata.email),usersT);
          window.location.replace('/MyProfile');
          alert('닉네임이 변경되었습니다');
        } else {
          alert('잠시 후 변경해주세요');
        }
      };
    return(
        <>
        <div>
            <div>
            {userdata ? 
                <form className="profilebox" onSubmit={onSubmit}>
                    <input className="input" onChange={onChange} type="text" placeholder="Display neme" value={newDisplayName} />
                    <input className="btn_sub" type="submit" value="Update" />
                    <br></br>
                    <button className="btn_sub" onClick={onLogOutClick}>Logout</button>
                </form>
                : 'loading...'
            }
            </div>
        </div>
        </>

    )
}


export default MyProfile;