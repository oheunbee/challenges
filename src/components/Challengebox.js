import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { nowWeeks } from '../service/getservice';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect,useState } from "react";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Challengebox({value}) {
  const [imageUrl, setImageUrl] = useState('');


  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, value.imageUrl); // 이미지 파일의 경로를 지정하세요.

    const getImageUrl = async () => {
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.log('이미지 URL을 가져오는 중에 오류가 발생했습니다:', error);
      }
    };

    getImageUrl();
  }, [value.imagePath]);


  return (
    <Paper
      sx={{
        p: 2,
        marginLeft: 1,
        minWidth: 500,
        width:'90%',
        flexGrow: 1,
        marginBottom:5,
        border:1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 200, height: 200 }}>
            <Img alt="complex" src={imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {value.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {value.startDate} - {value.endDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                챌린지 주차 : {value.challengeWeeks}주 / 현재주차 : {nowWeeks(value.startDate)}주차
              </Typography>
              
              <Typography variant="body2" gutterBottom>
                상세설명 {value.subtitle}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                자세히 보기
              </Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Paper>
  );
}