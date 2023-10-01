const express=require("express");
const router=express.Router();

router.use(express.urlencoded({extended:false}));
router.use(express.json());

const nodemailer=require('nodemailer');

const movieModel=require ("../model/movieModel");
const ticketBookingModel=require("../model/ticketBookings");

// get all movies booked by a perticular user
router.post('/getbookedtkts/:id', async(req,res)=>{
    const userId=req.params.id;
    console.log(userId)
    try {
        let movies= await ticketBookingModel.find({"userId":userId}).sort({date:-1}).exec()
        console.log(movies);
        
        res.json(movies);
        }
        
     catch (error) {
        console.log(error) ;
        res.json("error");
    }
    
})

// canceling tickets
router.post('/cancelticket/:id', async(req,res)=>{
    const tktId=req.params.id;
    const tktData=req.body;
    const id=req.body.movieId;
    const seatNo=req.body.seatNo;
    console.log(tktData);
    try {
        let deleteTicket= await ticketBookingModel.findByIdAndDelete({"_id":tktId})
        console.log(deleteTicket);
        const seatStatus=await movieModel.updateOne(
            {_id:id,"seats.seatname": seatNo },
             { $set: {'seats.$.disStatus': false },
               $inc:{'SeatAvailable':1}    
             },{updeart:true}
        )
        console.log(seatStatus);
        res.json({message:"Ticket Cancelled"});
        }
        
     catch (error) {
        console.log(error) ;
        res.json("error");
    }    
})

// GET ALL TICKETS BOOKED on a perticular date
router.post('/todaysBooking/:id', async(req,res)=>{
    const date=req.params.id;
    console.log(date)
    try {
        // let movies= await ticketBookingModel.find({$expr:{$eq:[{ $month:"$date"},9][]}}).exec()
        // {currentDate<new Date
        console.log(movies);
        
        res.json(movies);
        }
        
     catch (error) {
        console.log(error) ;
        res.json("error");
    }
})    
// Booking tickets
router.post("/seatupdate/:id", async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    const data=req.body.name;
    const tkts={
        "userId": req.body.userId,
        "moivieId":req.body.moivieId,
        "movieName":req.body.movieName,
        "seatNo":req.body.name,
        
    }
    const useremail=req.body.email;
    const content=req.body.text;
    console.log(req.body);
    var query={_id:id};
    try {
       const pot=await movieModel.updateOne(
            {_id:id,"seats.seatname": data },
             { $set: {'seats.$.disStatus': true },
               $inc:{'SeatAvailable':-1}    
             },{updeart:true}
        )
        const booking= await ticketBookingModel(tkts).save();
            console.log(booking);
            res.json({message:"seats updated"});
        
    }
    catch (error) {
        console.log(error);
        res.json({message:"seats couldnt update"});
    }

})

// save reviews in db
router.post('/addreviews/:id', async(req,res)=>{
    const id=req.params.id;
    const reviwes={
        "userName": req.body.userName,
        "riviews":req.body.Input.riviews,
        "ratings":req.body. rateingval,
    }
    console.log(reviwes);
    console.log(id);
    try {
        const addReviw= await movieModel.findByIdAndUpdate(id,{
               $push:{
                reviws:reviwes,
               },
        }) .exec();
        res.json({message:"Thank you for the review",addReviw});
        console.log(addReviw);
    }
    catch (error) {
        console.log(error) ;
        res.json("error");
    }
})    
// sen conformation mail
router.post('/sendmail', async (req,res)=>{
    const useremail=req.body.email;
    const content=req.body.text;
    var transporter = nodemailer.createTransport(
        {
            service:'gmail',
            auth:{
                user: 'varshavaeu47@gmail.com',
                
                pass:' djjj yrlq dlte zmhu '
               
            }
        })
     var mailOption={
        from:'Movie Booking App',
         to:useremail,
         subject:'ticket booking conformd',
          text:content
     }
   try {
    
   await transporter.sendMail(mailOption);
   res.json({message:"email sent successfully"})
       
   }
    catch (error) {
        console.log(error);
        res.json({error:"email couldnt sent"});
    
   }    
})


module.exports=router;