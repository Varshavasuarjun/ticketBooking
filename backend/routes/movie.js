const express=require("express");
const router=express.Router();

router.use(express.urlencoded({extended:false}));
router.use(express.json());

const movieModel=require ("../model/movieModel");
const ticketBookingModel=require("../model/ticketBookings");

//  update seats booked in a perticular movie
router.post("/bookingupdate", async(req,res)=>{
    const id= req.body._id;
    var query={_id:id};
    try {
    var post= await movieModel.updateOne({_id:id},{ $inc: {'SeatAvailable': 1 }}).exec();
    const newseat=post.SeatAvailable;
    var updatedseat=newseat-1;
    res.json({message:"seats updated",post});
    console.log(updatedseat)
    }
    catch (error) {
        console.log(error);
        res.json({message:"seats couldnt update"});

    }

})

// booking tikets 
router.post('/booktickets',async (req,res)=>{
    const tkts=req.body;
   
    try {
    const booking= await ticketBookingModel(tkts).save();
    
    console.log(booking);
    res.json({message:"ticket booked"});
    }
    catch(error){
        console.log(error) ;
       res.json("error");
    }
})

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
    console.log(tktId)
    try {
        let movies= await ticketBookingModel.findByIdAndDelete({"_id":tktId})
        console.log(movies);
        
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
// save booked SEATS in db
router.post("/seatupdate/:id", async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    const data=req.body.name;
    console.log(data);
    const datas={ "seats.name":"A2","seats.disabledd":true}
   
    var query={_id:id};
    // console.log(query);
    try {

         const pot=await movieModel.updateOne(
        {_id:id,"seats.seatname": data },
        { $set: {'seats.$.disStatus': true },
          $dec:{'SeatAvailable':1}    },{updeart:true}
        )
        
        var post= await movieModel.updateOne({_id:id},{ $inc: {'SeatAvailable': -1 }}).exec();
        const newseat=post.SeatAvailable;
        var updatedseat=newseat-1;
       res.json({message:"seats updated",updatedseat});
        console.log(post)
    }
    catch (error) {
        console.log(error);
        res.json({message:"seats couldnt update"});

    }

})



module.exports=router;