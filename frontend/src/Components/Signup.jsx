import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Navigate, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Typography,Link } from '@mui/material';
import axios from 'axios';


const Signup = () => {
  
  const navigate = useNavigate()
  const[input,setInput]=useState([]);
  const inputHolder=(e)=>{
   setInput({...input,[e.target.name]:e.target.value})
   console.log(input);
  }
 const signupHandler=()=>{
  console.log(input);
  axios.post("http://localhost:7000/api/signup",input)
  .then((response)=>{
    console.log(response.data)
    if(response.data.message==="saved succesfully"){
      alert(response.data.message);
      navigate("/login")
      
    }
    else{
      alert("failed to save the user")
    }
  })
  .catch((error)=>{
    console.log(error);
    
  })
 }
  return (
    <div>
      <Dialog open={"true"} >
        <Box margin={"1%"}>
          <Typography
          
             
            fontSize="30px"
            paddingTop={2}
            lineHeight={1.5}
            
            fontWeight="500"
            textAlign={"center"}
          >
            Sign Up
          </Typography>
        </Box>
        <DialogContent>
        <TextField
            autoFocus
            margin="auto"
            name="Name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputHolder}
          />
          <TextField
            autoFocus
            margin="auto"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={inputHolder}
          />
          <span> </span>
          <TextField
            autoFocus
            margin="auto"
            name="password"
            label="Password"
            type="email"
            fullWidth
            variant="standard"
            onChange={inputHolder}
          />

        </DialogContent>
        <DialogActions>

          <Button 
            sx={{ backgroundColor: "rgba(61,180,140, 1)", margin: "10px" }} 
            variant='auto' 
            fullWidth 
            textAlign={"center"} 
            size="large"
            onClick={signupHandler}
            >
              SignUp
              
          </Button>
        </DialogActions>
        <Box margin={"auto"} >
      <Typography
             marginBottom={"10%"}
             fontSize="15px"
             paddingTop={2}
             lineHeight={1.3}
             fontWeight="500"
             textAlign={"center"}
             
           >
            
            <i> Already have an account? <a href="/login">Log In</a></i>
            
             
           </Typography>
          
      </Box>
      </Dialog>
     
      
      ``

    </div>
  )
}

export default Signup