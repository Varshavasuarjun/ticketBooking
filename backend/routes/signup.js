const express=require("express");
const router=express.Router();

const userModel=require("../model/userModel");
const adminModel=require("../model/adminModel");

 router.use(express.urlencoded({extended:false}));
 router.use(express.json());

//  user signup
 router.post("/signup", async (req,res)=>{
    const userData= req.body;
    const data= await userModel(userData).save();
    res.json({message:"saved succesfully"});

 })

//  add admin credential
// router.post("/admin", async (req,res)=>{
//     const userData= req.body;
//     const data= await adminModel(userData).save();
//     res.json({message:"saved succesfully"});

//  })

// user  and admin login
router.post("/login",async (req,res)=>{
    const email=req.body.email;
    const password=req. body.password;
    console.log(email);
    console.log(password);
    const user= await userModel.findOne({email:email});
    try {
        
        if(user){
             try {
                console.log(user)
                if(user.password==password){
                
                   console.log(user)
                    res.json({message:"login successfull",data:user});
                }
                else{
                    res.json({message:"login fails"});
                }
            } 
            catch (error) {
            res.json("error");
            }
        }
        else{
            console.log(email);
            const admin= await adminModel.findOne({email:email});
            console.log(admin)
            if(admin){
                try {
                    if(admin.password==password){
                         console.log(admin)
                         res.json({message:"admin login  successfull"});
                    }
                     else{
                        res.json({message:"password doesn't match"}); 
                    }
                } 
                catch (error) {
                    res.json("error");
                }
           }
           else{
            res.json({message:"no such user found"}); 
           }
        }
    } 
    catch (error) {
        res.json({message:"no such user"});
    }
   
})
 module.exports=router;