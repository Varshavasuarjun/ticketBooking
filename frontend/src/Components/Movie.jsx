import { Box, Button, Card, CardActions, CardContent, Grid, Stack,Typography ,Rating } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Userheader from './Userheader'
import { red } from '@mui/material/colors'


const Movie = () => {
    const navigate=useNavigate();
    const movieId=sessionStorage.getItem("movieId")
    const[movieData,setMovieData]=useState([])
    
    useEffect(()=>{
      
        axios.post("http://localhost:7000/api/viewMovie/"+ movieId)
        .then((response)=>{
           console.log(movieId)
          
          if(response.status==200){
            // console.log(response.data)
            setMovieData(response.data)
            
            // console.log(movieData)

           }
          else{
            console.log(response.status)
           }
        }) 
      .catch((error=>console.log(error)))
   

    },[])
   console.log(movieData)
  return (
    
    <div style={{  backgroundImage:"linear-gradient(180deg, #BCEDC7, #B2A3DB)" }}   >
        <Userheader/>
        <Box  > 
            
           <Grid container  my={4}  padding={2}  marginLeft={2} marginRight={2}>
               <Grid item  xs={12} sm={6} xl={5}  my={2} display={'flex'}sx={{ maxHeight: 565 }} >
                <Stack width={"100%"} direction={'column'} spacing={1} >
                    <img  height={"100%"}  width={"90%"} margin="auto"
                    src={movieData.Image} alt="movie poster"  />
                    <Stack direction="row">
                       <h5>RATING : </h5> <Rating value={'3'} readOnly sx={{color:'red'}}/>
                    </Stack>  
                </Stack> 
                </Grid >

                <Grid item  xs={10} sm={6} xl={5}  my={2} display={'flex'}> 
                   <Card  my={4} height={'80%'} width={"100%"} sx={{  backgroundImage:"linear-gradient(180deg, #BCEDC7, #B2A3DB)" }} >                      
                      <CardContent height={'80%'}  display='flex' margin="auto" >
                          <Typography variant='h5' my={4} marginLeft={2} sx={{color:"red", justifyContent:'center'}}>
                              Movie : {movieData.MovieName}
                          </Typography>
                          <Typography variant='h6'my={4} marginLeft={2}>
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
                          Seats:   {movieData.NoOfSeats}
                          </Typography>
                         
                       </CardContent>
                       <CardActions>
                        <Button marginLeft={"5"} >BOOK TICKETS</Button>
                       </CardActions>
                    </Card>
                </Grid>
            </Grid >    
        </Box>

    </div>
  )
}

export default Movie