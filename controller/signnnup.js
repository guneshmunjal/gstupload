// to let the user signup you first need to fetch email,name , password, contact number
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "GUNESH";

// to let the user signup you first need to fetch email,name , password, contact number

exports.signup = async (req, res) => {
  try {
    const { name, email, password, verification, contact } = req.body;

    console.log(name, email, password, verification, contact);
    // we need to hash the password and then store it

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
    } catch (error) {
      res.status(404).json({
        message: `hashing failed due to ${error}`,
      });
    }

    // now you need to save all the details in the db

    const entry = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      verification: verification,
      contact: contact,
    });

    console.log(entry);

    const token = jwt.sign(
      {
        email: entry.email,
        password: entry.hashedpassword,
        verification: entry.verification,
        contact: entry.contact,
        name: entry.name,
      },
      JWT_SECRET
    );
    {
      return res.status(200).json({
        message: "user created successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `the error is ${error}`,
    });
  }
};

// now code  for login section

exports.Login = async (req, res) => {
  try {
    // first you need to fetch the email and password from the body

    const { email, password } = req.body;

    console.log("jbksj", email, password);

    // you need to check whether the user exists or not
    // check whether that id exists or not

    const checkUser = await userModel.findOne({
      email: email,
   
    });

    if (!checkUser) {
      res.json({
        success: false,
        message: "user does not exists please signup first",
      });
    }
    console.log("acdsdjjchalrahahai");

    // now you need to check that whether the email/password is correct or not
    const checkPassword = bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      res.json({
        success: false,
        message: "please enter the correct password",
      });
    }
    console.log("abcdef", checkPassword);

    const token = jwt.sign(
      { email: checkUser.email, password: checkPassword._id },
      JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    // existingUser = existingUser.toObject();
    console.log(checkUser);

    //   checkUser = checkUser.toObject();
    const userWithToken = { ...checkUser.toObject(), token };
    checkUser.token = token;

    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
    console.log(options);
    console.log("the options    were passed");

    res.cookie("cookieforeventmanagement", token, options).json({
      success: true,
      message: "cookie  passed successfully",
      token,
      checkUser,
    });
    console.log(token);
  } catch (error) {
    res.json({
      success: false,
      message: `the error is ${error}`,
    });
  }
};
