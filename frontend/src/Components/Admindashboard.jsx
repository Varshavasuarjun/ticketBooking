import { Grid, Stack , Card, CardContent, Typography, CardActions, Button, CardMedia, SliderValueLabel, Box, IconButton} from '@mui/material';
import React, { useEffect, useState } from 'react'
import Userheader from './Userheader';
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Admindashboard = () => {
  const[movie,setMovie]=useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    axios.post("http://localhost:7000/api/viewMovies")
    .then((response)=>{
        if(response.status==200){
         console.log("success");
         setMovie(response.data);
        }
       else{
         console.log("check the network, status is not ok")
        } 
      })
    .catch((error=>console.log(error)));
   },[])

  //  DELETE MOVIE
  const deleteHandler=(e)=>{
    let id=e
    axios.post("http://localhost:7000/api/deleteMovie/"+ id)
    .then((response)=>{
      if(response.data.message==="movie removed successfully"){
        console.log(response.data.message);
        alert("deletd succesfully")
        window.location.reload(false);
      }
      else{
        console.log(response.data.message)
      }
    })
    .catch((error=>console.log(error)))

  }
 
    
  return (
    <div  style={{ height: "100%", backgroundImage:"linear-gradient(TO RIGHT TOP, #051937, #004D7A, #008793,#00BF72,#A8EB12)" }}>
      <Userheader/>
      <Box sx={{ minHeight: "100vh" }} display={"flex"} >
        <Grid container  my={4}  padding={3}  margin={"auto"} sx={{alignItems:"center", margin:"auto"}} >
           {movie.map((value,index)=>{
            return <Grid item key={index} xs={12} sm={4} xl={12}  my={2} display={'flex'} >
            <Card   height={"100"} margin={"2px"} display={"flex"} sx={{minWidth:"300px" ,maxHeight:"500px", minHeight:"150px" ,width:"",  backgroundImage:"linear-gradient(TO left bottom, #051937, #004D7A, #008793,#00BF72,#A8EB12)" ,':hover':{boxShadow:20}}}>                      
        
            <CardContent  >
            <Stack direction={"row"}>
               <img 
                 height={"50%"} 
                 width={"50%"} 
                 src={value.Image}
                 alt="movie poster"
                 margin="auto" 
               />
                <Stack sx={{ color:"white" , marginLeft:"5px", padding:"5px"}}>
                   <Typography gutterBottom variant='h6' component="div">
                      {value.MovieName}
                   </Typography>
                   <Typography gutterBottom variant='body' component="div">
                      {value.Category}
                   </Typography>
                   <Typography gutterBottom variant='body' component="div">
                      {value.Languages}
                   </Typography>
                   <Typography gutterBottom variant='body' component="div">
                       RATING(AVG)
                    </Typography>
                   <Typography gutterBottom variant='body' component="div">
                       NO.TIKTS SOLD
                    </Typography>
                </Stack>
            </Stack>
            </CardContent>
          
           <CardActions>
            <IconButton></IconButton>
            <Button  variant='contained' endIcon={<DeleteForeverIcon/>} onClick={()=>{deleteHandler(value._id)}} >DELETE </Button>
           </CardActions>
         </Card>
       </Grid>
      })}

      </Grid>  
      </Box>
    </div>
  )
}

export default Admindashboard