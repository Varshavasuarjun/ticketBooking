import React, { useEffect, useState } from 'react'
import{AppBar, Box, Tab,Tabs, Toolbar} from '@mui/material'
import TheatersIcon from '@mui/icons-material/Theaters';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
const Headder = () => {
  
  const [movie,setMovie]=useState([]);
  useEffect(()=>{
     axios.post('http://localhost:7000/api/viewMovies')
     .then((response)=>{
       console.log(response.data);
       setMovie(response.data);
       
   console.log( movie)
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
             renderInput={(params) => 
            <TextField variant="standard" 
            sx={{input:{color:"white"}}}
               {...params}
               placeholder="Search for Movies" 
            />}

          />
       </Box>
       <Box display={"flex"} >
         <Tabs  textColor='white' indicatorColor='white'>
            <Tab label="LogIn" href='/login' />
            <Tab label="SignUp" href='/signup'/>
         </Tabs>

       </Box>
     </Toolbar>

   </AppBar>
  )
}

export default Headder