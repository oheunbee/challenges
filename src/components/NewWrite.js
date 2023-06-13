import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore"
const NewWrite =  () => {
const navigate = useNavigate()
const [content, setContent] = useState({
    title : '',
    subtitle : '',
    members : 0,
    challengeWeeks : 0,
    startDate : '',
    endDate : '',
})
const handleChange = (id, value) => {
    setContent(prevState => ({
        ...prevState,
        [id]: value.target.value
    }));
    // if(id == 'pPrice' || id == 'pName'|| id == 'pDetail'){
    //     setProductInfo(prevState => ({
    //         ...prevState,
    //         [id]: value.target.value
    //       })); 
    // }
  };
  const onSubmit = async (event)=> {
    const writeObj = {
        title : content.title,
        subtitle : content.subtitle,
        members : content.members,
        challengeWeeks : content.challengeWeeks,
        startDate : content.startDate,
        endDate : content.endDate,
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
    <input placeholder="challengeWeeks" type="number" min="1" onChange={value =>{handleChange('challengeWeeks',value)}}/> <br></br>
    <span>시작일 : </span>
    <input placeholder="startDate" type="date" onChange={value =>{handleChange('startDate',value)}}/> <br></br>
    <spna>종료일 : </spna>
    <input placeholder="endDate" type="date" onChange={value =>{handleChange('endDate',value)}}/> <br></br>
    
    <button onClick={onSubmit} >저장</button>
    </>
    )
}

export default NewWrite;