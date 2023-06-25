const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const CardRouter = require("./routes/CardRoutes");
const UserRouter = require("./routes/UserRoutes")

//Sessions
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//middleware
app.use(express.json());
 
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
app.use(cors())
module.exports = app;

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
app.use("/", CardRouter);
app.use("/", UserRouter);

