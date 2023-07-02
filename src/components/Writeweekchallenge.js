import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { getChallenge } from "../service/getservice";

const Writeweekchallenge = ({ userdata }) => {
  const navigate = useNavigate();
  console.log('너는 되는 것 맞지?')
  const location = useLocation();
  const [content, setContent] = useState({
    content: "",
    percent: "",
    nextcontent: "",
  });
  const handleChange = (id, value) => {
    setContent((prevState) => ({
      ...prevState,
      [id]: value.target.value,
    }));
  };
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    getChallenge("challenges", path, setContent, false, "", false);
  }, [path]);

  const onSubmit = async (event) => {
    const writeObj = {
      content: content.content,
      userId: userdata.uid,
      week: location.state.week,
      challenge: location.state.challenge,
    };
    await addDoc(collection(dbService, "weekchallenge"), writeObj);
    navigate("/");
    alert("기록되었습니다");
  };

  console.log(location) 
  return (
    <>
      <input
        placeholder="금주진행"
        onChange={(value) => {
          handleChange("content", value);
        }}
      />{" "}
      <br></br>
      <input
        placeholder="만족도"
        min={1}
        max={100}
        type="number"
        onChange={(value) => {
          handleChange("percent", value);
        }}
      />{" "}
      <br></br>
      <input
        placeholder="차주진행"
        onChange={(value) => {
          handleChange("nextcontent", value);
        }}
      />{" "}
      <br></br>
      <button onClick={onSubmit}>저장</button>
    </>
  );
};

export default Writeweekchallenge;