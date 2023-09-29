import React, { useEffect, useState } from 'react'
import{AppBar, Box, Tab,Tabs, Toolbar,Avatar} from '@mui/material'
import TheatersIcon from '@mui/icons-material/Theaters';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Userheader = () => {
    const [movie,setMovie]=useState([]);
    const [userName,setUserName]=useState(sessionStorage.getItem("userName"));
    const [value,setValue]=useState(null)
    const navigate=useNavigate()
    
    useEffect(()=>{
       axios.post('http://localhost:7000/api/viewMovies')
       .then((response)=>{
         
         setMovie(response.data);
         console.log(response.data);
         //  console.log( movie)
       })
       .catch()
    },[])
    
  
  return (
    <AppBar  position='stickey' sx={{bgcolor:"#2b2d42"}}>
    <Toolbar>
      <Box width={'20%'}>
         <TheatersIcon/> 
      </Box>
      <Box width={"25%"} margin={"auto"} >
         <Autocomplete 
            freeSolo
            options={movie.map((option) => option.MovieName)}
            value={value}
            onChange={(event,newvalue)=>setValue(newvalue)}
          
            renderInput={(params) => 
           <TextField variant="standard" 
           sx={{input:{color:"white"}}}
              {...params}
              placeholder="Search for Movies" 
           />}

         />
      </Box>
      <Box display={"flex"}>
        <Tabs  textColor='white' indicatorColor='white'>
        <Tab label="My BookingS" href='/Bookedtickets'/>
           <Tab  label={userName}  href='/Userdashboard'/>
           <Avatar 
            size="small"
            src="/broken-image.jpg" />
          
        </Tabs>

      </Box>
    </Toolbar>

  </AppBar>
  )
}

export default Userheader