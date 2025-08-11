const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview} = require("../middleware/validateListing");

const { isLoggedIn,isReviewAuthor } = require("../middleware/isLoggedIn.js");
const ReviewController = require("../Controller/Review.js");




//creating Review Route: 
router.post("/",isLoggedIn,validateReview ,wrapAsync(ReviewController.CreateReview));

// delete Route:
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.DestroyReview));

module.exports = router;