import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography, Rating ,InputAdornment} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Userheader from './Userheader'
import Modal from 'react-bootstrap/Modal';
import ChairIcon from '@mui/icons-material/Chair';

const Movie = () => {
    const navigate = useNavigate();
    const[seat,setseat]=useState([])
    const userId = sessionStorage.getItem("userId")
    const movieId = sessionStorage.getItem("movieId")
    const movieName =sessionStorage.getItem("movieName")
    const [movieData, setMovieData] = useState([])
    const [availbe, setavailbe] = useState(null)
    const [disable, setdisable] = useState(false)
    const [colourr, setcolour] = useState(false)
    const [show, setShow] = useState(false);
    const [selectedSeat,setSelectedSeat]=useState('');
    const[blokSeat,setBlikseat]=useState("true")
   
    useEffect(() => {

        axios.post("http://localhost:7000/api/viewMovie/" + movieId)
            .then((response) => {
                console.log(movieId)

                if (response.status == 200) {
                    // console.log(response.data)
                    setMovieData(response.data)
                    console.log(userId);
                setseat(response.data.seats);
                    if (response.data.SeatAvailable == "0") {
                        setavailbe("HOUSEFULL")
                        setdisable(true)
                        setcolour("red")
                      
                    }
                    else if (response.data.SeatAvailable <= "5") {
                        setavailbe("Fast Filling")
                        setcolour("orange")
                    }
                    else {
                        setavailbe("AVAILABLE")
                        setcolour('#7cb342')
                    }

                    // console.log(movieData)

                }
                else {
                    console.log(response.status)
                }
            })
            .catch((error => console.log(error)))


    }, [])
    console.log(movieData)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const seatHandler=(val)=>{
        console.log(val.seatname);
         setSelectedSeat(val.seatname)
         setBlikseat("red");
    }  

   const confromSeatHandler=(e)=>{
        
        console.log("first")
        console.log(blokSeat );
        const data={
            "name":selectedSeat
        }
        const tktdata={
           "userId": userId,
            "moivieId": movieId,
            "movieName":movieName,
        }
        axios.post("http://localhost:7000/api/seatupdate/" + movieId, data)
        .then((response)=>{
            console.log(response.data)
            
            if(response.data.message=="seats updated"){
                axios.post("http://localhost:7000/api/booktickets",tktdata)
                .then((response)=>{
                    window.location.reload("false");
                    console.log(response.data.message)
                })
            }
        })
        
        .catch(err=>console.log(err))

   }

    return (
        <div style={{ backgroundImage: "linear-gradient(180deg, #BCEDC7, #B2A3DB)" }}   >
            <Userheader />
            <Box  >
                <Grid container my={4} padding={2} marginLeft={2} marginRight={2}>
                    <Grid item xs={12} sm={6} xl={5} my={2} display={'flex'} sx={{ maxHeight: 565 }} >
                        <Stack width={"100%"} direction={'column'} spacing={1} >
                            <img height={"100%"} width={"90%"} margin="auto"
                            src={movieData.Image} alt="movie poster" />
                           <Stack direction="row">
                               <h5>RATING : </h5> <Rating value={'3'} readOnly sx={{ color: 'red' }} />
                          </Stack>
                        </Stack>
                    </Grid >

                    <Grid item xs={10} sm={6} xl={5} my={2} display={'flex'}>
                        <Card my={4} height={'80%'} width={"100%"} sx={{ backgroundImage: "linear-gradient(180deg, #BCEDC7, #B2A3DB)" }} >
                            <CardContent height={'80%'} display='flex' margin="auto" >
                                <Typography variant='h5' my={4} marginLeft={2} sx={{ color: "red", justifyContent: 'center' }}>
                                    Movie : {movieData.MovieName}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2}>
                                    Category:  {movieData.Category}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2}>
                                    Languages:  {movieData.Languages}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2} textAlign={'justify'} >
                                    Description: {movieData.Description}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2}>
                                    Cast : {movieData.Cast}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2}>
                                    TicketRates:  {movieData.TicketRates}
                                </Typography>
                                <Typography variant='h6' my={4} marginLeft={2}>
                                    Seats:   {movieData.SeatAvailable}
                                </Typography>                       
                            </CardContent>
                            <CardActions>
                                <Button marginLeft={"5"} disabled={disable} variant='contained' onClick={handleShow} >
                                    BOOK TICKETS
                                </Button>
                                <Modal show={show} onHide={handleClose}  style={{display:"contained", minHeight:"650px"}} >
                                    <Modal.Header closeButton>
                                        <Grid container>
                                            <Grid item xs={6} md={6}>
                                                <img 
                                                  style={{ width:"100%", maxHeight:'242px'}} 
                                                  src={movieData.Image} alt=""
                                                 /> 
                                             </Grid>
                                           <Grid item xs={6} md={6} alignItems={'center'} >
                                                <Button
                                                    margin="auto" 
                                                    variant="contained" 
                                                    textAlign="end"
                                                    size='small' 
                                                    sx={{ backgroundColor: colourr ,color:'black' }} >
                                                    {availbe}
                                                </Button>
                                                <Typography marginTop={2} variant='h6' fontFamily={'BlinkMacSystemFont'} textAlign={"center"}>
                                                  Movie: &nbsp;{movieData.MovieName} 
                                                </Typography > 
                                               <Typography   textAlign={"center"} fontFamily={'BlinkMacSystemFont'}>
                                                 Shows : &nbsp;{movieData.timing} 
                                               </Typography > 
                                                <Typography variant='body1' margin={"4px"} textAlign={"center"} fontFamily={'BlinkMacSystemFont'} >
                                                 Rs. &nbsp;{movieData.TicketRates}
                                                </Typography> 
                                            </Grid>  
                                        </Grid>                                
                                    </Modal.Header>
                                    <Modal.Body style={{height:"125px"}} >
                                        <Box sx={{display:"flex"}}position={"absolute"}  >
                                          <Grid xs="9" sm="9" md="9" xl="9" sx={{width:"100%",alignContent:"center"}} >
                                                {seat.map((val,index)=>{
                                                    return  <Button 
                                                               marginTop ={2} 
                                                               disabled={val.disStatus  } 
                                                               onClick={() => seatHandler(val) }
                                                               value={val.seatname}
                                                               sx={{width:"1px", height:"1px", padding:"5"}} >
                                                               <ChairIcon />
                                                               {/* <ChairIcon sx={{ color:blokSeat}} */}
                                                             </Button>
                                                })}  
                                                Available:  <Button><ChairIcon /></Button> Booked: <Button disabled><ChairIcon /></Button>
                                                {/* <Typography> Selected Seat: {selectedSeat}</Typography> */}
                                                {/* <Button onClick={confromSeatHandler}>Confirm</Button> */}
                                            </Grid>                                        
                                         </Box>
                                   
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Typography variant='h6'fontFamily={'BlinkMacSystemFont'} my={2}>
                                          Selected Seat: {selectedSeat}
                                         </Typography>
                                         <Button onClick={confromSeatHandler}>
                                           Confirm
                                        </Button>
                                        <Button  onClick={handleClose}>
                                            Close
                                        </Button>
                                       
                                    </Modal.Footer>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid >
            </Box>
      </div>
    )
}

export default Movie