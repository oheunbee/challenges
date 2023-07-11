import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { nowWeeks } from '../service/getservice';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect,useState } from "react";
import { getAllJoinChallenge,getImageUrl } from '../service/getservice';
import { Link } from 'react-router-dom';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Challengebox({values}) {
  const [imageUrl, setImageUrl] = useState('');
    const [member, setMember] =useState([])
    console.log(imageUrl,'????')
  useEffect(() => {
    if(values.id){
    getAllJoinChallenge(values.id,setMember)
        }
    getImageUrl(values.imageUrl, setImageUrl);
  }, [values.imagePath]);



  return (
    <Paper
      sx={{
        p: 2,
        marginLeft: 1,
        minWidth: 500,
        width:'98%',
        flexGrow: 1,
        marginBottom:5,
        border:1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >{values.id? 
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 400, height: 200 }}>
            <Img alt="complex" src={imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {values.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {values.startDate} - {values.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                챌린지 주차 : {values.challengeWeeks}주 / 현재주차 : {nowWeeks(values.startDate)}주차
              </Typography>
              <Typography variant="body2" color="text.secondary">
                참여 명수  : {member.length}명
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                설명
              </Typography>
              <Typography variant="body2" gutterBottom>
                {values.subtitle}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Link to={`/Challenge/${values.id}`}>자세히보기</Link>
                
              </Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
      :''
    }
    </Paper>
  );
}