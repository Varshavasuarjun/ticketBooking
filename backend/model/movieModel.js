const mongoose=require("mongoose");
movieSchema=mongoose.Schema({
    MovieName : "String", 
    Image :"String",
    Category:"String",
    Languages:"String",
    Cast:"String",
    // Cast: {
    //     type: [
    //         {
    //             castimg: {
    //                 type: String,
    //                 required: false,
    //             },

    //             castname:{
    //                 type:String,
    //                 required: false
    //             }
               
    //         },
    //     ],
    //     default: [],
    // },
    seats:[{
        seatname:"String",
        disStatus:"Boolean"
          }],
   reviws:[{
          userName:"String",
          riviews:"String",
          ratings:"Number"
          }],
    Booking:["String"],
    Description:"String",
    TicketRates:"Number",
    NoOfSeats:"String",
    SeatAvailable:"Number",
    timing:"String"

})
movieModel=mongoose.model("movie",movieSchema);
module.exports=movieModel;