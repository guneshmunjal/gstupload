const jwt = require("jsonwebtoken");
require("dotenv").config();
   const JWT_SECRET    =" GUNESH";

exports.middlewareAUTH = async(req,res,next)=>{
    try {
        //the main function of this auth middleware is to check the authorization. whether the user is correct or not
        // if yes then verify the token using jwt verify method and then pass onto the next middleware that is "isStudent"

          console.log("diss")
        // now to verify the token we first have to extract the token from the body 
        const token = await req.body.token || req.cookie.token;
        console.log("sfs",token);
         
       // the code below means that we are checking whether the token is there or not and if not then send the message as the token is invalid
        if (!token){
            res.status(400).json({
                message:"INVALID TOKEN "
            })
            return;
        }
        console.log(token);

    // now we are verifying the token 
    // again  you have to use try and catch method 
     try{
     const verifyToken = jwt.verify(token,JWT_SECRET)
        console.log(verifyToken);
        req.user=verifyToken;// this is written to store the values of role in req.user so that we can access it later on in the 
        // next middlewares as welln
        next(); 
     return;
    }
     catch(err){
        res.status(404).json({
            message:`the error is ${err}`
        })

     }
     next();


    }catch (error) {
        res.status(404).json({
            message:`the errror is coming ${error}`
    })
}}


exports.isclient = async(req,res,next) =>{
    try {
        // we need to verify that whether this is a student or not 

         if(req.user.role !== "client")
        {
            res.status(401).json({
                message:"this is a protected route"
            })
              return;
        }
        next();
    } catch (error) {
        res.status(400).json({
            message:`there is a ${error}`
        });
        
    }
}



exports.isAdmin = async(req,res,next) =>{
    try {
        // we need to verify that whether this is a student or not 

         if(req.user.role !== "admin")
        {
            res.status(401).json({
                message:"this is a protected route"
            })
              return;
        }
        next();
    } catch (error) {
        res.status(400).json({
            message:`there is a ${error}`
        });
        
    }
}

