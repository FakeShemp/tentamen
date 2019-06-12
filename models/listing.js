mongoose = require('mongoose');

const listingSchema = new mongoose.Schema([
    {
        coordinates: {
            lng: {
                type: Number
            },
            lat: {
                type: Number
            }
        },
        street: {
            type: String,
            required: true
        },
        location: {
            municipality: {
                type: String
            },
            city: {
                type: String
            }
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number
        },
        monthly_fee: {
            type: Number
        },
        active: {
            type: Boolean,
            required: true
        },
    }
]);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;