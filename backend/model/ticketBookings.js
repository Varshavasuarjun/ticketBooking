const mongoose=require("mongoose");
const ticketBookingSchema=mongoose.Schema({
    userId: "String",
    moivieId: "String",
    movieName:"String",
    date:{
        type: Date,
     
    
    }  
})
ticketBookingModel=mongoose.model("ticketBooking",ticketBookingSchema);
module.exports=ticketBookingModel;