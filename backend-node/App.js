const express = require("express");
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

//Sessions
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay, httpOnly: false,},
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());

//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'triple-triad',
    },
    console.log("CONNECTED")
);

app.use(cors());

//Read PUT/POST
app.use(express.json({ extended: false }));

//PORT SET
app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });

module.exports = app;

// routes
const cards = require('./routes/api/Cards');
const users = require('./routes/api/users');
app.use('/api/cards', cards);
app.use('/api/users', users);






