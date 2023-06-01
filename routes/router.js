const express = require("express");
const router = express.Router();


const {signup} = require("../controller/signnnup")
const {Login} = require("../controller/signnnup");
//const{firebase} = require("../controller/firebase")
const { middlewareAUTH,isclient,isAdmin} = require("../middleware/middlewareAUTH");


router.post("/signup",signup);
router.post("/login",Login);
//router.post("/upload",firebase);
router.get("/auth",middlewareAUTH,(req,res)=>{
    res.status(200).json({
        message:"you have entered the path successfully"
    })
})

//router.get("/client",
 //()=>{middlewareAUTH,isclient, (req,res) =>{
// res.status(200).json({
 //   message:"you have entered the client path successfully"
 //})}
//})

/*router.get("/admin",middlewareAUTH,isAdmin, (req,res) =>{
  res.status(200).json({
     message:"you have entered the admin path successfully"
  })
 })
*/
router.get("/admin", ()=>{
  middlewareAUTH,isAdmin,(req,res) =>{
    res.status(200).json({
      message:"you have entered the admin path"
    })
  }
})





module.exports=router;