const mongoose = require('mongoose');

const portSchema = new mongoose.Schema({
    nameOfThePort: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true

    },
    country: {
        type: String,
        required: true
    }
});

const portData = new mongoose.model("port",portSchema);
module.exports = portData;