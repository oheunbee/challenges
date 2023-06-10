import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore"
const Masterwrite =  () => {
const navigate = useNavigate()
const [content, setContent] = useState({
    title : '',
    subtitle : '',
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
        createdAt: Date.now(),
        };
        await addDoc(collection(dbService, "challenges"), writeObj);
        navigate("/")
        alert('기록되었습니다')
}
    return(
    <>
  <input placeholder="title" onChange={value =>{handleChange('title',value)}}/>
  <input placeholder="subtitle" onChange={value =>{handleChange('subtitle',value)}}/>
  <button onClick={onSubmit}>저장</button>
     </>
    )
}

export default Masterwrite;