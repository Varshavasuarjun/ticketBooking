import { Grid, Stack , Card, CardContent, Typography, CardActions, Button, CardMedia, SliderValueLabel} from '@mui/material';
import React, { useEffect, useState } from 'react'
import Userheader from './Userheader';
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom"
const Userdashboard = () => {
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

// load a movie when clicked
   const movieHandler=(e)=>{
      const movieId= e._id
      sessionStorage.setItem("movieId", movieId);
      console.log(movieId);
      navigate("/movie")

      // axios.post("http://localhost:7000/api/viewMovie/"+ movieId)
      // .then((response)=>{
      //   console.log(response.data)
      //   if(response.status==200){
      //     navigate("/movie")
      //     console.log(response.data)
      //   }
      //   else{
      //     console.log(response.status)
      //   }
      // }) 
      // .catch((error=>console.log(error)))
   }

  return (
    <div>
    <Userheader/>
    <Grid container  my={4}  padding={2}  margin={"auto"} sx={{  backgroundImage:"linear-gradient(TO RIGHT TOP, #051937, #004D7A, #008793,#00BF72,#A8EB12)" }}>
      {movie.map((value,index)=>{
        return <Grid item key={index} xs={12} sm={3} xl={3}  my={2} display={'flex'} >
          <Card  my={2} height={'100%'} width={"100%"} margin="auto" >                      
            <CardContent display={"flex"} >
               <img 
               height={"100%"} 
               width={"100%"} 
               src={value.Image}
                alt="movie poster"
                 margin="auto" 
                 onClick={()=>movieHandler(value)}
                 
                 />
               <Typography gutterBottom variant='h6' component="div">
                  {value.MovieName}
               </Typography>
              <Typography gutterBottom variant='body' component="div">
                {value.Category}
              </Typography>
              <Typography gutterBottom variant='body' component="div">
                {value.Languages}
              </Typography>
           </CardContent>
           <CardActions
            >
              <Button size='small'  >BOOK</Button>
           </CardActions>
         </Card>
       </Grid>
      })}

    </Grid>  
    
    </div>
  )
}

export default Userdashboard;