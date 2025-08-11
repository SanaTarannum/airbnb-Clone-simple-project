const mongoose = require("mongoose");
const initData = require("./data.js");
const reviewsData = require("./reviewData.js");
const Listing = require("../models/Listings/listing.js");
const Review = require("../models/Listings/review.js");

const MONGODB_URL = 'mongodb://127.0.0.1:27017/Project';

main().then(() => {
    console.log("mongodb connected");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGODB_URL);
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"688116b3b3a95f55927665a3"}));
    const insertedListings = await Listing.insertMany(initData.data);
    console.log("Listings initialized");

    await Review.deleteMany({});
    

    // Seed reviews and associate them with listings
    for (let listing of insertedListings) {
        for (let review of reviewsData.data) {
            const newReview = new Review(review);
            newReview.listing = listing._id; 
            
             newReview.author = "688116b3b3a95f55927665a3";
            // associate with current listing
            await newReview.save();

            listing.reviews.push(newReview._id); // push review ID to listing
        }
        await listing.save(); // save updated listing
    }

    console.log("Fake reviews inserted and linked to listings");
    mongoose.connection.close();
};

initDb();


