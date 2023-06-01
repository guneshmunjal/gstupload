const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

name:{
    type:String,

    validate: {
        validator: function (value) {
          const nameParts = value.split(" ");
          return nameParts.length >= 2; // to check whether firname and lastname exists or not
        },
        message: "Please provide a valid name with a space between first name and last name.",
      },
      required: true,

},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    
    validate:{     
       validator:function(value){
        const password = value.length;
        if(password<=8){
         return  console.log("enter a stronger password")
        }
       
       }
    },
    required:true,

},

verification:{
        type:String,
        enum:["client","admin"],
        required:true,
},
contact:{
  type:Number,
  validate:{     
    validator:function(value){
     const contact = value.length;
     if(contact <10){
      return  console.log("enter the correct phone number")
     }
    
    }
 },
  required:true,
}

});


module.exports = mongoose.model("userSchema",userSchema);
