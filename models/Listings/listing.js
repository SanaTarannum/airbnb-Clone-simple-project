const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref } = require("joi");
const { listingSchema } = require("../../schema.js");

const ListingSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type: String
    },
    image: {
  filename: { type: String },
  url: { type: String }
},
price:{
     type:Number,
      
    },
    location:{
        type:String
    },
    country: {
        type :String
    },
    reviews : [
    {
     type: Schema.Types.ObjectId,
     ref: "Review"
     }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true
  }
},
});

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;


