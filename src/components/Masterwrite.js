import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore"
const Masterwrite =  ({userdata}) => {
const navigate = useNavigate()
const [content, setContent] = useState({
    title : '',
    subtitle : '',
    members : 0,
    challengeWeeks : 0,
    startDate : '',
    term : '',
})
console.log(content,'cont')
const handleChange = (id, value) => {
    setContent(prevState => ({
        ...prevState,
        [id]: value.target.value
    }));
    if(id == 'term'){
        setContent(prevState => ({
            ...prevState,
            [id]: Number(value.target.value)
          })); 
    }
  };
const currentDate = new Date(content.startDate);
const futureDate = new Date(currentDate.getTime() + (7*content.term * 24 * 60 * 60 * 1000));

// 날짜 형식 설정 (YYYY-MM-DD)
var year = futureDate.getFullYear();
var month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
var day = futureDate.getDate().toString().padStart(2, '0');

// 결과 출력
let result = year + '-' + month + '-' + day;
console.log(result,'??')
  const onSubmit = async (event)=> {
    const writeObj = {
        title : content.title,
        subtitle : content.subtitle,
        members : content.members,
        challengeWeeks : content.term,
        startDate : content.startDate,
        endDate : result,
        createdAt: Date.now(),

        };
        await addDoc(collection(dbService, "challenges"), writeObj);
        navigate("/")
        alert('기록되었습니다')
}
    return(
    <>
    <input placeholder="title" onChange={value =>{handleChange('title',value)}}/> <br></br>
    <input placeholder="subtitle" onChange={value =>{handleChange('subtitle',value)}}/> <br></br>
    <input placeholder="members" type="number" min="1" onChange={value =>{handleChange('members',value)}}/> <br></br>
     <span>시작일 : </span>
    <input placeholder="startDate" type="date" onChange={value =>{handleChange('startDate',value)}}/> <br></br>
    {/* <span>종료일 : </span>
    <input placeholder="endDate" type="date" onChange={value =>{handleChange('endDate',value)}}/> <br></br> */}
     <span>주차 : </span>
     <input placeholder="주차" type="number" onChange={value =>{handleChange('term',value)}}/> <br></br>
     <span>마무리일자 : </span>
     <div>{result}</div>
    <button onClick={onSubmit} >저장</button>
    </>
    )
}

export default Masterwrite;