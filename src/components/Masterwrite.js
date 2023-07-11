import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { addDoc, collection} from "firebase/firestore"
import { TextField } from "@mui/material";

const Masterwrite =  ({userdata}) => {
const storage = getStorage();
const navigate = useNavigate()
const [content, setContent] = useState({
    title : '',
    subtitle : '',
    content:'',
    challengeWeeks : 0,
    startDate : '',
    term : '',
    image: null,
    imageUrl: "",
})
console.log(content,'cont')

const imageInputRef = useRef(null);

const handleChange = (id, value) => {
  setContent((prevState) => ({
    ...prevState,
    [id]: value.target.value,
  }));
  if (id === "term") {
    setContent((prevState) => ({
      ...prevState,
      [id]: Number(value.target.value),
    }));
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setContent((prevState) => ({
    ...prevState,
    image: file,
    imageUrl: `challengeImage/${file.name}`,
  }));

};

const handleUpload = async () => {
  if (content.image) {
    const storageRef = ref(storageService, `challengeImage/${content.image.name}`);
    await uploadBytes(storageRef, content.image);
  
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
const onSubmit = async (event) => {
  event.preventDefault();
  await handleUpload();
  const writeObj = {
    title: content.title,
    subtitle: content.subtitle,
    content:content.content,
    userid : userdata&&userdata.uid,
    challengeWeeks: content.term,
    startDate: content.startDate,
    endDate: result,
    imageUrl: content.imageUrl, // 수정: content.imageUrl 사용
    createdAt: Date.now(),
  };

  await addDoc(collection(dbService, "challenges"), writeObj);
  navigate("/");
  alert("기록되었습니다");
};
    return(
    <div>
    <input placeholder="title" onChange={value =>{handleChange('title',value)}}/> <br></br>
    <input placeholder="subtitle" onChange={value =>{handleChange('subtitle',value)}}/> <br></br>
    <TextField
          id="standard-multiline-static"
          label="챌린지내용"
          multiline
          rows={10}
          placeholder="자세한 내용을 입력해주세요"
          variant="standard"
          onChange={value =>{handleChange('content',value)}}
        />
    <div>
    <span>시작일 : </span>
    <input placeholder="startDate" type="date" onChange={value =>{handleChange('startDate',value)}}/> <br></br>
    </div>
    {/* <span>종료일 : </span>
    <input placeholder="endDate" type="date" onChange={value =>{handleChange('endDate',value)}}/> <br></br> */}
     <span>주차 : </span>
     <input placeholder="주차" type="number" onChange={value =>{handleChange('term',value)}}/> <br></br>
     <span>마무리일자 : </span>
     <div>{result!=='NaN-NaN-NaN' ? result : ''}</div>
     <br />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={imageInputRef}
        style={{ display: "none" }}
      />
      <button onClick={() => imageInputRef.current.click()}>이미지 선택</button>
      {content.image && <img src={URL.createObjectURL(content.image)} alt="이미지" />}
      <br />
      {/* <button onClick={handleUpload}>이미지 업로드</button> */}
      <br />
    <button onClick={onSubmit} >저장</button>
    </div>
    )
}

export default Masterwrite;