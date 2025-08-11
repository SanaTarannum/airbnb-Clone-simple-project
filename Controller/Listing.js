const Listing = require("../models/Listings/listing");
const axios = require('axios');



module.exports.index = async(req,res)=>{
const allListings = await Listing.find({});
 res.render("index",{allListings});
}


module.exports.Search = async (req, res) => {
    let {q} = req.query;
    let filter = {};
    if (q) {
        filter = {
            $or: [
                { country: { $regex: new RegExp(q, 'i') } },
                { location: { $regex: new RegExp(q, 'i') } }
            ]
        };
    }
    const listings = await Listing.find(filter);
    res.render("index", { allListings: listings });
};


module.exports.RendernewForm = (req,res)=>{
  res.render("new");
}

module.exports.ShowListing = async(req,res)=>{
let {id} = req.params;
const listing = await Listing.findById(id).populate({path:"reviews",populate:{
  path:"author",
}}).populate("owner");
if(!listing){
    req.flash("error","Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  console.log(listing);
res.render("show",{listing}); 
}

module.exports.RenderEditForm = async(req,res)=>{
  let {id} = req.params;
  console.log(id);
  let listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist");
     res.redirect("/listings");
  }
    let OriginalImage = listing.image.url ;
   OriginalImage = OriginalImage.replace("/upload", "/upload/w_250,h-250");
  res.render("edit",{listing,OriginalImage});
}


module.exports.CreateListing = async (req, res) => {
  try {
    const listingData = req.body.Listing;
    const newlisting = new Listing(listingData);

    
    // ✅ Geocoding from OpenCage
    const geoRes = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: process.env.OPENCAGE_API_KEY,
        q: listingData.location,
        limit: 1
      }
    });

    if (!geoRes.data.results.length) {
      req.flash("error", "Invalid location provided.");
      return res.redirect("/listings/new");
    }

    const geo = geoRes.data.results[0].geometry;
    console.log("🌍 Coordinates:", geo); // ✅ Debug

    // ✅ Save geometry into listing
    newlisting.geometry = {
      type: 'Point',
      coordinates: [geo.lng, geo.lat] // ⚠️ lng first, then lat
    };
 
    newlisting.owner = req.user._id;

    if (req.file) {
      let url = req.file.path;
      let file = req.file.filename;
      newlisting.image = { url, file };
    } else {
      req.flash("error", "Image is required");
      return res.redirect("/listings/new");
    }

    await newlisting.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${newlisting._id}`);
  } catch (err) {
    console.error("🔥 ERROR in CreateListing:", err);
    req.flash("error", err.message || "Something went wrong");
    res.redirect("/listings/new");
  }
};



module.exports.UpdateListing = async(req,res)=>{
  let {id} = req.params;
  const listings = await Listing.findByIdAndUpdate(id,{...req.body.Listing});
  console.log(listings);
  if( typeof req.file !== "undefined"){
  let url = req.file.path;
      let file = req.file.filename;
      listings.image = { url, file };
}
 await listings.save();
 req.flash("success","Listing is Updated");
  res.redirect(`/listings/${id}`);
}

module.exports.DestroyListing = async(req,res)=>{
let {id}= req.params;
await Listing.findByIdAndDelete(id);
req.flash("success","Listing is deleted");
 res.redirect("/listings"); 
}