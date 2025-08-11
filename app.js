require('dotenv').config();
const express = require("express");
const router = express.Router();
const app = express();
const PORT = 8080;
const path = require("path");
const mongoose = require('mongoose');
// const Mongodb_URL = 'mongodb://127.0.0.1:27017/Project';
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const UserRouter = require("./routes/users.js");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); // ✅ This is your User model
const MongodbAtlas_URL = process.env.MONGO_URI ;
const Listing = require("./models/Listings/listing");



app.engine("ejs", engine);  // VERY IMPORTANT
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

main().then(()=>{
    console.log("mongodb connected");   
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MongodbAtlas_URL);
}  

const store = MongoStore.create({
mongoUrl : MongodbAtlas_URL,
  crypto :{
    secret: process.env.SECRET,
   touchAfter: 24 * 3600, // 24 hours
}});

store.on("error", ()=>{
console.log("🔥 Error in MongoStore");
});



const sessionOptions = {
  store,
  secret:process.env.SECRET,         
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now()+7*24*60*60*1000 ,
    maxAge: 1000 * 60 * 60 * 24,
     httpOnly: true,     
  }
};




app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
  usernameField: "email"  // ✅ email will be treated as username
}, User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  // res.locals.isAdmin = req.user && req.user._id === '688116b3b3a95f55927665a3';
  next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",UserRouter);



app.all("*sama",(req,res,next)=>{
 next(new ExpressError(404,"Page Not Found"))
});






app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500; // default 500 if undefined
  const message = err.message || "Something went wrong!";
  res.status(statusCode).render("Error", {message});
});

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
});





