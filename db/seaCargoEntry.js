const mongoose = require('mongoose');

const seaCargoSchemsa = new mongoose.Schema({
    seaPortOrigin: {type: String},
    seaPortDestination: {type: String},
    seaCargotype: {type: String},
    seaContainerType: {type: String},
    seaFreeTime: {type: String},
    seaTransitTime: {type: String},
    seaCarrier: {type: String},
    seaTerms: {type: String},
    seaCargoPrice: {type: Number},
    seaCargoValidityDate: {type: Date},
});

const seaCargoData = new mongoose.model("seaCargo",seaCargoSchemsa);
module.exports = seaCargoData;