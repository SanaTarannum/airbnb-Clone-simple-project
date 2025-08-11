const Review = require("../models/Listings/review.js");
const Listing = require("../models/Listings/listing");


module.exports.CreateReview = async(req,res)=>{
     console.log("✅ Review POST route hit");
  let {id} = req.params;
  let listing = await Listing.findById(req.params.id);
  console.log(listing);
  let newReview = new Review(req.body.Review);
  console.log(newReview);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success","Review  is Success");
   res.redirect(`/listings/${id}`);
}

module.exports.DestroyReview = async(req,res)=>{
console.log(req.params);
let {id,reviewId} = req.params;
await Review.findByIdAndDelete(reviewId);
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  req.flash("success","Review is deleted");
  res.redirect(`/listings/${id}`);
}