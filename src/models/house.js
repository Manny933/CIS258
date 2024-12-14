const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    houseInfo: {
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        description: { type: String, required: true },
        askingPrice: { type: Number, required: true },
        image: { type: String }
    },
    bids: [
        {
            name: { type: String  },
            amount: { type: Number }
        }
    ]
});

const HouseModel = mongoose.model("House", HouseSchema);
module.exports = HouseModel;
