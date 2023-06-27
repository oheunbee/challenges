import { useEffect,useState } from "react";
import { dbService, storageService} from "../firebase";
import {collection,limit,query,where, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { connectAuthEmulator } from "firebase/auth";

const Mychallenges =  ({userdata}) => {
    let navigate = useNavigate();
    const [content, setContent] = useState()
    const [array, setArray] = useState([]);
    function findChall(item, index, arr) {
        const q = query(collection(dbService, 'challenges'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const allChallenges = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .find((doc) => doc.id === item.challenge);
      
          if (allChallenges) {
            setArray((prevArray) => [...prevArray, allChallenges]);
          }
        });
      
        return () => {
          unsubscribe();
        };
      }
<<<<<<< HEAD
=======

>>>>>>> 2d22e4db744b93bb1b3c0d583ee20d1634ef29e2
        useEffect(() => {
            const q = query(collection(dbService, 'challengejoin'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const allChallenges = querySnapshot.docs.map((doc) => {
                    return {
                        id : doc.id,
                        ...doc.data(),
                    }
                  }).filter(value=>value.userId===userdata.uid).forEach(findChall)
              })
              return () => {
                unsubscribe()
              }
          }, []);

          console.log(array,'ar')
           // 삭제 - D
        const deleteUser = async(id) =>{
        // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
        const userDoc = doc(dbService, "challenges", id);
        // deleteDoc을 이용해서 삭제
        await deleteDoc(userDoc);
        console.log(id)
        navigate("/");
        }

    console.log(content,'content')
    return(
        <>
      {array&&array.map(value=>
        <div key={value.id}>
<<<<<<< HEAD
            {value.title}
=======
            <Link to={`/JoinChallenge/${value.id}`}>{value.title}</Link>
>>>>>>> 2d22e4db744b93bb1b3c0d583ee20d1634ef29e2
        </div>)}
            </>

    )
}


export default Mychallenges;