import React, { useEffect, useState } from 'react'
import Headder from './Headder'
import { AppBar, Box, Grid, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea } from '@mui/material';
import axios from 'axios';


const Home = () => {
 const[movie,setMovie]=useState([]);
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
  
  return (
    <div style={{  backgroundImage:"linear-gradient(180deg, #BCEDC7, #B2A3DB)" }} >
     <Headder/>
     <Box width={"100%"} height={"100%"} margin={"auto"}  >
         
          
    
      <Box width={"85%"} height={"60vh"} margin={"auto"} marginTop={4} display={"flex"} >
      <img src="https://images.hindustantimes.com/img/2021/09/10/1600x900/433a32c8-123c-11ec-9df0-295675b4f7f0_1631299260587.jpg" alt="movie" 
       height={"100%"}
       width={"100%"}
       margin={"auto"}/>
      
       
      </Box >
      
      <Box>
      {/* <Typography variant='h6'
           margin={"auto"}  
           display={"flex"}
           justifyContent={"center"}>
               Book your Tickets hazzle free  
          </Typography>  */}
      <Typography  
          variant='h4'
           margin={"auto"}  
           display={"flex"}
           marginTop={4}
           
           justifyContent={"center"}
           >
            
            Latest Release
          </Typography>
         
      </Box>
      <Box 
      display={"flex"} width={"100%"} height={"100%"} margin={"auto"} marginTop={4} marginLeft={4}>
        
        {movie.slice(0,4).map((value,index)=>{
          return <Card  key={index} h-100  sx={{ maxWidth: 350 , borderRadius:3,padding:"2%",margin:"2%",":hover":{ boxShadow:"10px 10px 20px #cc"}} }>
          <CardActionArea>
          <img height={"50%"} width={"100%"} src={value.Image} alt="movie poster" margin="auto"  flex-grow={1} flex-basis={0}/>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
             {value.MovieName}
           </Typography>
           <Typography variant="body1" color="text.secondary">
            Cast: {value.Cast}
        </Typography>
            <Typography variant="body1" color="text.secondary">
             Lanaguage: {value.Languages}
          </Typography>
          
           
         </CardContent>
    </CardActionArea>
  </Card>
        })}
         </Box>
          </Box  >
        
    </div>

  )}

export default Home