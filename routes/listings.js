const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {validateListing} = require("../middleware/validateListing");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn,isOwner} = require("../middleware/isLoggedIn.js");
const ListingController = require("../Controller/Listing.js");
const multer = require("multer");
const{storage} = require("../CloudConfig.js");
const upload = multer({storage});
const Listing = require("../models/Listings/listing.js");

//Index Route
router.get("/",wrapAsync(ListingController.index));


//Serach Route:
router.get('/search',wrapAsync(ListingController.Search)); 

router.get("/test-listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.json(listings);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching listings");
    }
});



//new Route:
router.get("/new",isLoggedIn, ListingController.RendernewForm);

//Show route :
router.get("/:id",isLoggedIn,wrapAsync(ListingController.ShowListing));


//edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(ListingController.RenderEditForm));

//Create Route 
router.post("/",isLoggedIn,upload.single("Listing[image]"), validateListing,wrapAsync(ListingController.CreateListing));


//update Route
router.put("/:id",isLoggedIn,
  isOwner, upload.single("Listing[image]"),validateListing,
  wrapAsync(ListingController.UpdateListing));


//Delete Route
router.delete("/:id",isLoggedIn, isOwner ,wrapAsync(ListingController.DestroyListing));


module.exports = router ;
