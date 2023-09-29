import React, { useEffect, useState } from 'react'
import Userheader from './Userheader'
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Bookedtickets = () => {
    const userId = sessionStorage.getItem("userId");
    const [bookedMovies, setBookedMovies] = useState([]);
    const navigate=useNavigate()
    useEffect(() => {

        axios.post("http://localhost:7000/api/getbookedtkts/" + userId)
            .then((response) => {
                console.log(response.data)
                if(response.data==""){
                      alert("Ooops!!! No  bookings yet, but it's Never Late");
                      navigate("/Userdashboard")
                }
                else{
                    setBookedMovies(response.data);
                }
               

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
                            //    <Stack spacing={1} direction={"row"}>
                            return <Box margin={"auto"} padding={2} sx={{  marginTop: "4%", backgroundImage: "linear-gradient(TO RIGHT TOP, #051937, #004D7A, #008793,#00BF72,#A8EB12)" }}>
                                  <Grid xs={12} sm={12} xl={12}  >
                                <Card height={'90%'} width={"100%"} sx={{ backgroundColor: "black", color: "wheat", margin: "2px" }}  >
                                    <Stack direction={"row"} display={"flex"}>
                                        <CardContent alignContent={"center"}>
                                            <Typography margin={1}>
                                                Movie : {value.movieName}
                                            </Typography>
                                            <Typography margin={1}>
                                                Seats: E25
                                            </Typography>
                                            <Typography margin={1}>
                                            Booked On : &nbsp;  {new Date(value.date).getDate()}-  {new Date(value.date).getMonth()}-  {new Date(value.date).getFullYear()}
                                            </Typography>
                                                <Button
                                                    value={value}
                                                    
                                                    variant='text'
                                                    onClick={() => CancelHandler(value)}
                                                    sx={{ justifyContent:"center" }} >
                                                    CANCEL
                                                </Button>
                    
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