import { authService, firebaseInstance } from '../firebase'
import {
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider, signInWithPopup 
} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';

function Login(){
  const navigate = useNavigate();
 const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const onChange = (event) => {
  const {
    target: { name, value }
  } = event
  if (name === 'email') {
    setEmail(value)
  } else if (name === 'password') {
    setPassword(value)
  }
}

const onSubmit = (event) => {
  event.preventDefault()
  signInWithEmailAndPassword(
    authService,
    email,
    //displayName,
    password
);
navigate("/")

}

const onSocailClick = async(event) => {
  const {target:{name}} = event
  let provider
  if(name ==="google"){
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    const data = await signInWithPopup(authService, provider)
      .then((data) => {
        console.log(data); // console에 UserCredentialImpl 출력
      })
  }else if (name ==="github"){
    const provider = new GithubAuthProvider(); // provider 구글 설정
    const data = await signInWithPopup(authService, provider)
      .then((data) => {
        console.log(data); // console에 UserCredentialImpl 출력
      })
  }
  await authService.signInWithPopup(provider)
  
}

return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value="Log-In" />
      </form>
      <div>
        <button name='google' onClick={onSocailClick}>Continue with Google</button>
        <button name='github' onClick={onSocailClick}>Continue with github</button>
      </div>
      <a href='join'>회원가입</a>
    </div>
  )

}

export default Login