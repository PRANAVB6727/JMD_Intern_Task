const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
    nameOfTheCarrier: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
      }
});
const carrierData = new mongoose.model("carrier",carrierSchema);
module.exports = carrierData;