import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Typography,Link } from '@mui/material';
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [input, setInputs] = useState({});

  const inputHolder=(e)=>{
     setInputs({...input, [e.target.name]: e.target.value})
     console.log(input);
  }

  const loginHandler=()=>{
    axios.post("http://localhost:7000/api/login",input)
    .then((response)=>{
      console.log(response)
      if(response.data.message==="login successfull"){
        navigate("/userdashboard");
      }
      else if(response.data.message==="admin login  successfull"){
        alert("admin login succesfull")
        navigate("/admindashboard");
      }
      else{
        console.log(response.data.message)
        alert(response.data.message)
      }
    })
    .catch(error=>console.log(error))
  }
  return (
    <div>
      <Dialog open={"true"} >
        <Box margin={"1%"}>
          <Typography
             
            fontSize="30px"
            paddingTop={2}
            lineHeight={1.3}
            fontWeight="500"
            textAlign={"center"}
          >
            Log In
          </Typography>
        </Box>
        <DialogContent>

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
            onClick={loginHandler}>
              LOG IN
              
          </Button>
        </DialogActions>
        <Box>
      <Typography
             marginBottom={"10%"}
             fontSize="15px"
             paddingTop={2}
             lineHeight={1.3}
             fontWeight="500"
             textAlign={"center"}
           >
            <i>Dont have an account yet !!? <a  href='/signup'>Sign Up</a></i> 
             
           </Typography>
           
      </Box>
      </Dialog>
     
      
    </div>
  )
}

export default Login