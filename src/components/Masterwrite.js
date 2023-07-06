import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { addDoc, collection} from "firebase/firestore"


const Masterwrite =  ({userdata}) => {
const storage = getStorage();
const navigate = useNavigate()
const [content, setContent] = useState({
    title : '',
    subtitle : '',
    members : 0,
    challengeWeeks : 0,
    startDate : '',
    term : '',
    image: null,
    imageUrl: '',
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

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   setContent((prevState) => ({
//     ...prevState,
//     image: file,
//   }));
// };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setContent((prevState) => ({
    ...prevState,
    image: file,
    imageUrl: file ? file.name : '', // 파일의 이름만 imageUrl로 저장
  }));
};

const handleUpload = async () => {
  if (content.image) {
    const storageRef = ref(storageService, `challengeImage/${content.image.name}`);
    await uploadBytes(storageRef, content.image);
    const downloadURL = await getDownloadURL(storageRef);
    setContent((prevState) => ({
      ...prevState,
      imageUrl: downloadURL,
    }));
  } else {
    setContent((prevState) => ({
      ...prevState,
      imageUrl: '',
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
        imageUrl: content.imageUrl,
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
      <br></br>
    <button onClick={()=>{onSubmit(); handleUpload();}} >저장</button>
    </>
    )
}

export default Masterwrite;