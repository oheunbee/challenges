import { authService, dbService} from "../firebase";
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc} from "firebase/firestore"
/* ... */
function Join(){
     const navigate = useNavigate();    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } 
    };

    // const handleChange = (id, value) => {
    //     setNickname(prevState => ({
    //         ...prevState,
    //         [id]: value.target.value
    //     }));
    //   };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
          await createUserWithEmailAndPassword(authService, email, password);
      
          const users = {
            email: email,
            displayName: '',
            uid: '',
          };
      
          const userDocRef = doc(dbService, 'users', email); // 문서 참조 생성
          await setDoc(userDocRef, users); // 생성한 문서에 데이터 설정
      
          navigate("/");
          alert('회원가입이 완료되었습니다');
        } catch (error) {
          console.error('회원가입 오류:', error);
          // 오류 처리
        }
      };
     
      
      
      
   
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                required
                value={email}
                onChange={onChange}
            />
            <input
                name={"password"}
                type={"password"}
                placeholder={"Password"}
                required
                value={password}
                onChange={onChange}
            />
            {/* <input
                name={"displayName"}
                type={"displayName"}
                placeholder={"displayName"}
                required
                value={displayName}
                onChange={onChange}
            /> */}
            <br></br>
            <input type={"submit"} value="회원가입" />
        </form>
    </div>
    );
}

export default Join