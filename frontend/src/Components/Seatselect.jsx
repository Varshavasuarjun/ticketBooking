import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Seatselect = () => {
    const movieId = sessionStorage.getItem("movieId")
    const [movieData, setMovieData] = useState([])
    const [availbe, setavailbe] = useState("")
    const [disable, setdisable] = useState(false)
    const [colourr, setcolour] = useState(false)
    useEffect(() => {
        axios.post("http://localhost:7000/api/viewMovie/" + movieId)
            .then((response) => {
                console.log(movieId)

                if (response.status == 200) {
                    // console.log(response.data)
                    setMovieData(response.data)

                    if (response.data.SeatAvailable == "0") {
                        setavailbe("HOUSEFULL")
                        setdisable(true)
                        setcolour("red")

                    }
                    else if (response.data.SeatAvailable <= "5") {
                        setavailbe("Fast Filling")
                        setcolour("yellow")
                    }
                    else {
                        setavailbe("AVAILABLE")
                        setcolour("green")
                    }

                    // console.log(movieData)

                }
                else {
                    console.log(response.status)
                }
            })
            .catch((error => console.log(error)))


    }, [])

    return (

        <Paper sx={{ padding: "25px", margin: "25px" }}>
            <Stack
                sx={{ border: '1px solid' }}
                direction='row'
                spacing={2}
                divider={<Divider orientation='vertical' flexIteam
                />}>
                {/* <Stack 
            sx={{border:'1px solid'}}>
                <Box
                sx={{
                    backgroundColor:'primary.main',
                    color:'white',
                    height:'100px',
                    width:'100%',
                    padding:'16px',
                    '&:hover':{
                        backgroundColor:'primary.light',
                    },
                }}>
             codeevalution
                </Box>
                <Box
                display={'flex'}
                height='100px'
                width='100%'
                backgroundColor='primary.light'
                >
                    hello
                </Box> */}
                {/* </Stack>  */}
                <Grid container my={4}>
                    <Grid item xs={6}>
                        <Box height='400px' p={2}>
                            <img style={{ maxWidth: "100%" }} src={movieData.Image} alt="" />
                        </Box>

                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                             <Typography variant='h6' textAlign={"center"}>
                            Movie: &nbsp;{movieData.MovieName}
                            </Typography >
                            <Typography textAlign={"center"}>
                                SHOWS : &nbsp;{movieData.timing}
                            </Typography >
                            <Typography variant='body1' margin={"4px"} textAlign={"center"} >
                                Rs. &nbsp;{movieData.TicketRates}
                            </Typography>
                         </Box>

                    </Grid>
                    <Grid item xs={8}>
                       <Box>
                           
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        <Button  sx={{width:"1px", height:"1px", padding:"5"}} ><ChairIcon/> </Button>
                        </Box>

                    </Grid>
                    
                </Grid>



            </Stack>
        </Paper>
    )
}

export default Seatselect