const mongoose=require("mongoose");
const ticketBookingSchema=mongoose.Schema({
    userId: "String",
    moivieId: "String",
    movieName:"String",
    seatNo:"String",
    date:{
        type: Date,
        default: new Date(),
    
    }  
})
ticketBookingModel=mongoose.model("ticketBooking",ticketBookingSchema);
module.exports=ticketBookingModel;