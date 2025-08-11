const Listing = require("../models/Listings/listing");
const Review = require("../models/Listings/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user);
    // console.log(req.path)
    if(!req.isAuthenticated()){
        req.session.redirecturl =req.originalUrl
 req.flash("error","You must be Login");
 return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl
    }
    next();
};


module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // ✅ Check if listing exists
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  const currUser = res.locals.currUser;
  const allowedOwnerId = '688116b3b3a95f55927665a3';

  // ✅ Correct permission check
  const isOwner = listing.owner._id.equals(currUser._id);
  const isAdmin = currUser._id === allowedOwnerId;

  if (!isOwner && !isAdmin) {
    req.flash("error", "You don't have permission to access this.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};



module.exports.isReviewAuthor = async (req,res,next)=>{
    let{reviewId,id} = req.params;
  let  review = await Review.findById(reviewId);
   console.log(review);
 if(!review.author.equals( res.locals.currUser._id)){
req.flash("error","You Didn't have permisssion To delete this");
  return  res.redirect(`/listings/${id}`);
 }
  next();
}