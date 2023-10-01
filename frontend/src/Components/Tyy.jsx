import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, Rating, CardContent, Container, Grid, Paper, Stack,  Typography, Input } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

const Bookedtickets = () => {
    const userId = sessionStorage.getItem("userId");
    const [bookedMovies, setBookedMovies] = useState([]);
    const [currentdate,setDate]= useState(new Date())
    const [rateingval,setRatingval]=useState(null)
    const [show, setShow] = useState(false);
    const handleChange=(e,val)=>{
        setRatingval(val)
        console.log(val)
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const navigate=useNavigate()

    useEffect(() => {

        axios.post("http://localhost:7000/api/getbookedtkts/" + userId)
            .then((response) => {
                console.log(response.data)
                setDate(new Date());
                
                if(response.data==""){
                      alert("Ooops!!! No  bookings yet, but it's Never Late");
                      navigate("/Userdashboard")
                }
                else{
                    setBookedMovies(response.data);
                   
                   
                }
               console.log(currentdate);

            })
            
            .catch((error => console.log("error")))
    }, [])

    //  cancelling tickets
    const CancelHandler = (e) => {
         
         const tktId= e._id;
         axios.post("http://localhost:7000/api/cancelticket/" + tktId)
            .then((response) => {
                console.log(response.data.message)
                if(response.data.message==="Ticket Cancelled"){
                    alert(response.data.message);
                    window.location.reload(false);
                }
                else{
                    console.log("cannot cancel")
                }

            })
            .catch((error => console.log("error")))
    }
    return (
        <div style={{ height: "100%", backgroundImage: "linear-gradient(TO RIGHT TOP, #051937, #004D7A, #008793,#00BF72,#A8EB12)" }}>
            <Userheader />
            <Box sx={{ minHeight: "100vh" }} display={"flex"}>
                <Container maxWidth="sm" height="100%" sx={{ marginTop: "5%", marginBottom: "5%" }}>
                    <Typography variant='h4' align='center' marginBottom={1}>  Tickets</Typography>
                    {bookedMovies.map((value, index) => {
                        return <Box margin={"auto"} padding={2} sx={{  marginTop: "4%", backgroundImage: "linear-gradient(TO RIGHT TOP, #051937, #004D7A, #008793,#00BF72,#A8EB12)" }}>
                            <Grid xs={12} sm={12} xl={12}  >
                                <Card height={'90%'} width={"100%"} sx={{ backgroundColor: "beige",  margin: "2px" }}  >
                                    <Stack direction={"row"} display={"flex"}>
                                        <CardContent alignContent={"center"}>
                                            <Typography margin={1}>
                                                Movie : {value.movieName}
                                            </Typography>
                                            <Typography margin={1}>
                                                Seats: 
                                            </Typography>
                                            <Typography margin={1}>
                                                Booked On : &nbsp;  {new Date(value.date).getDate()}-  {new Date(value.date).getMonth()}-  {new Date(value.date).getFullYear()}
                                            </Typography>
                                            {currentdate<=new Date(value.date)? 
                                            
                                             <Button
                                                value={value}
                                                variant='text'
                                                onClick={() => CancelHandler(value)}
                                                sx={{ justifyContent:"center" }} >
                                                    CANCEL
                                            </Button>
                                             :  <>
                                             <h6>RATING : </h6> <Rating value={rateingval} onChange={handleChange} sx={{ color: 'red' }} />
                                            <Button variant="text" onClick={handleShow}>Review</Button>
                                                <Modal show={show} onHide={handleClose} style={{ minHeight:"650px",padding:"100px", backgroundColor:"wheat"}}>
                                                <Grid container style={{ minHeight:"50px", margin:"50px"}}>
                                                    <Grid item xs={12} md={12}>
                                                        <Typography>
                                                            How was your movie
                                                        </Typography>
                                                   </Grid>
                                                   <Grid item xs={6} md={6}>
                                                  <Input type='text'>
                                                  </Input>
                                                         <h6>Give RATING : </h6> <Rating value={rateingval} onChange={handleChange} sx={{ color: 'red' }} />
                                                   </Grid>
                                                </Grid>
                                            </Modal>
                                             </>} 
                                            
                                                 
                                                 
                                            

                                        </CardContent>
                                    </Stack>
                               </Card>
                           </Grid>
                        </Box>
                            //    </Stack>
                    })}
                   
                </Container>
            </Box>
        </div>
    )
}

export default Bookedtickets


