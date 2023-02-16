const mongoose = require('mongoose');

const airCargoSchemsa = new mongoose.Schema({
    airPortOrigin: {type: String},
    airPortDestination: {type: String},
    airCargotype: {type: String},
    airCargoWeight: {type: String},
    airFreeTime: {type: String},
    airTransitTime: {type: String},
    airCarrier: {type: String},
    airTerms: {type: String},
    airCargoPrice: {type: Number},
    airCargoValidityDate: {type: Date},
});

const airCargoData = new mongoose.model("airCargo",airCargoSchemsa);
module.exports = airCargoData;