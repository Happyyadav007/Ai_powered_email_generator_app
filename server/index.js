const express = require('express');
const app = express();
const {sendEmail} = require('./controller/sendEmail');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",  // Allow frontend to access backend
    methods: ["GET", "POST"],         // Allowed request methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true                 // Allow cookies if needed
}));

require("./config/database").connect();

//importing route
const user = require("./routes/user");

//mounting route
app.use('/api/v1', user);

app.post('/api/v1/send-email',upload.array("attachments"), sendEmail);

//activate server
app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
})