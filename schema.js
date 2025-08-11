  const joi = require("joi");

// Listing schema with nested structure
const listingSchema = joi.object({
  Listing: joi.object({
    title: joi.string().required().messages({
      "string.empty": "Title is required"
    }),
    description: joi.string().required().messages({
      "string.empty": "Description is required"
    }),
    price: joi.number().required().messages({
      "string.empty": "Price is required"
    }),
    location: joi.string().required().messages({
      "string.empty": "Location is required"
    }),
    country: joi.string().required().messages({
      "string.empty": "Country is required"
    }),
  }).required()
})


const ReviewSchema = joi.object({
Review:joi.object({
rating: joi.number().required().min(1).max(5),
comment:joi.string().required()
}).required()

});


module.exports = { listingSchema ,ReviewSchema};
