import React, {useState, useRef, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore ,dbService, storageService } from "../firebase";
import { getDownloadURL, ref, uploadString} from "@firebase/storage";
import { addDoc, collection, doc, updateDoc, query, onSnapshot, getDocs, querySnapshot} from "firebase/firestore"
import { Challenge } from "./Challenge";

const NewWrite =  () => {
const navigate = useNavigate()
const [content, setContent] = useState({});
const handleChange = (id, value) => {
    setContent(prevState => ({
        ...prevState,
        [id]: value.target.value
    }));
  };
  useEffect(() => {
  let db = firestore.collection('challenges').get().then((결과)=>{
    결과.docs.forEach((doc)=>{
        console.log(doc.data())
        let con1 = doc.data();
        setContent(con1);
    })
  })
}, []);

//   const onSubmit = async (id)=> {
//     const writeObj = {
//         title : content.title,
//         subtitle : content.subtitle,
//         members : content.members,
//         challengeWeeks : content.challengeWeeks,
//         startDate : content.startDate,
//         endDate : content.endDate,
//         createdAt: Date.now(),
//         };
//         await addDoc(collection(dbService, "challenges"), writeObj);
//         navigate("/")
//         alert('기록되었습니다')
//     };

    const updateUser = async(id) =>{
        // 내가 업데이트 하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
        const userDoc = doc(dbService, "challenges", id)
        // 내가 업데이트 하고자 하는 key를 어떻게 업데이트할지 준비,, 중요한점이 db에는 문자열로 저장되어있다. 그래서 createUsers()함수안에서 age를 생성할때 숫자열로 형변환 해줘야한다
        const newField = {
            title : content.title,
            subtitle : content.subtitle,
            members : content.members,
            challengeWeeks : content.challengeWeeks,
            startDate : content.startDate,
            endDate : content.endDate,
            createdAt: Date.now(),
            };
        // updateDoc()을 이용해서 업데이트
        await updateDoc(userDoc, newField);
        alert('변경되었습니다.')
      }



    return(
    <>
    <input placeholder={content.title} onChange={value =>{handleChange('title',value)}}/> <br></br>
    <input placeholder={content.subtitle} onChange={value =>{handleChange('subtitle',value)}}/> <br></br>
    <input placeholder={content.members} type="number" min="1" onChange={value =>{handleChange('members',value)}}/> <br></br>
    <input placeholder={content.challengeWeeks} type="number" min="1" onChange={value =>{handleChange('challengeWeeks',value)}}/> <br></br>
    <span>시작일 : </span>
    <input placeholder={content.startDate} type="date" onChange={value =>{handleChange('startDate',value)}}/> <br></br>
    <span>종료일 : </span>
    <input placeholder={content.endDate} type="date" onChange={value =>{handleChange('endDate',value)}}/> <br></br>
    
    <button onClick={updateUser}>저장</button>
    </>
    )
}

export default NewWrite;