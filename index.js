/*const express = require("express");
const app = express();
const {Storage} = require('@google-cloud/storage');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: '<your-storage-bucket-url>'
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Upload the file to Firebase Storage
  // You can use the Firebase Admin SDK to upload the file here

  res.status(200).send('File uploaded successfully.');
});


const storage = new Storage();

// Upload the file to Firebase Storage
async function uploadFileToFirebaseStorage(file) {
  const bucket = storage.bucket('<your-storage-bucket-url>');
  const fileName = Date.now() + '_' + file.originalname;
  const fileRef = bucket.file(fileName);

  const stream = fileRef.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (error) => {
      reject(error);
    });

    stream.on('finish', () => {
      resolve();
    });

    stream.end(file.buffer);
  });
}

// Inside the Express route handler for file upload
try {
  await uploadFileToFirebaseStorage(file);
  res.status(200).send('File uploaded successfully.');
} catch (error) {
  console.error('Error uploading file:', error);
  res.status(500).send('Error uploading file.');
}

require("dotenv").config();
const bcrypt = require('bcrypt');

const morgan = require('morgan')
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

// now using middleware to pass the data

app.use(express.json())

//mount
const user = require("./routes/router")
app.use("/api/v1",user);

// connection with db
const dbconnect = require ("./config/database");
dbconnect();

// starting the server

app.listen(PORT,()=>{
    console.log(`the app is running successfully on port ${PORT}`);
})

app.get("/",()=>{
    res.send("it seems to working quite seamlessly");
})*/
const express = require("express");
const app = express();
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

const serviceAccount = require("./config/serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://gstfile-9ed44.appspot.com'
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = admin.storage().bucket();
    const fileName = Date.now() + '_' + file.originalname;
    const fileRef = bucket.file(fileName);

    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    });

    stream.on('finish', () => {
      res.status(200).send('File uploaded successfully.');
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

// Rest of your code for user signup and login

require("dotenv").config();
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// Mount routes
const user = require("./routes/router");
app.use("/api/v1", user);

// Connection with DB
const dbconnect = require("./config/database");
dbconnect();

// Starting the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`The app is running successfully on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("It seems to be working quite seamlessly");
});