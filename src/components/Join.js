import { authService, dbService} from "../firebase";
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection} from "firebase/firestore"
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

    const onSubmit = (event) => {
        event.preventDefault();
                createUserWithEmailAndPassword(
                    authService,
                    email,
                    //displayName,
                    password
                );
                const users = {
                    email : email,
                    displayName : "",
                    uid : ""
                    };
                    addDoc(collection(dbService, "users"), users);
        navigate("/")
        alert('회원가입이 완료되었습니다')
        }
   
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
            <input type={"submit"} value="회원가입"/>
        </form>
    </div>
    );
}

export default Join