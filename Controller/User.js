const User = require('../models/user.js');


module.exports.RenderSignUpForm = (req,res)=>{
res.render("users/signup.ejs");
}

module.exports.CreateSignUp = async(req,res)=> {   
try{
  let {username,email,password} = req.body;
 const newUser = new User({email,username});
 const Registeruser = await User.register(newUser,password);
 console.log(Registeruser);
 req.login(Registeruser,(err)=>{
  if(err){
    return next(err);
  }
   req.flash("success","Welcome To WanderLust");
    res.redirect("/listings"); 
 });          
}catch(e){
req.flash("error",e.message);
res.redirect("/signup");
}                                                                     
}



module.exports.RenderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.CreateLogin = async(req, res) => {
    req.flash("success", "Welcome to WanderLust, You are logged in!");
let redirecturl = res.locals.redirecturl || "/listings" ;
    res.redirect(redirecturl);
  }


  module.exports.DestroyUser = (req,res,next)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","You Logout!");
      res.redirect("/listings");
    });
  }