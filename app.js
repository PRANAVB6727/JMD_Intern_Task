const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require('body-parser');
require("./db/connection");
const portData = require("./db/portEntry");
const carrierData = require("./db/carrierEntry");
const seaCargoData = require("./db/seaCargoEntry");
const airCargoData = require("./db/airCargoEntry");
const app = express();
const router = express.Router();
const port = 3000;

//for image upload
let storage = multer.diskStorage({
  destination:"./static/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
})
let upload = multer({
  storage:storage
});

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //to get form data

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// port section routing
app.get("/", (req, res) => {
  portData.find({})
  .then((ports)=>{
    res.render("index", {ports});
  })
});

app.post("/submitPort", async(req, res) => {
    var portName = req.body.portName;
    var area = req.body.area;
    var country = req.body.country;
    const portEntry = new portData({
      nameOfThePort:portName,
      area:area,
      country:country
    })
    const portAdded = await portEntry.save();
    res.redirect("/")
});

// edit port
app.get('/editPort/:id', (req, res) => {
  portData.findById(req.params.id, (err, portData) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.render("portEdit",{port:portData});

    }
  })
})
app.post('/editPort/:id', (req, res) => {
  portData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedData) => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

//delete port
app.get("/deletePort/:id", (req, res)=>{
  portData.findByIdAndRemove(req.params.id, (err, port) => {
    if (err) return console.error(err);
    res.redirect('/');
  });
});


// carrier section routing
app.get("/Carrier", (req, res) => {
  carrierData.find({})
  .then((carriers)=>{
    res.render("carrier", {carriers});
  })
});


app.post("/submitCarrier", upload.single("image"), async(req, res) => {
  var carrierName = req.body.carrierName;
  if(req.file){
    var carrierLogo = req.file.filename;
  }
  else{
    var carrierLogo = carrierName;
  }
  const carrierEntry = new carrierData({
    nameOfTheCarrier:carrierName,
    image:carrierLogo
  })
  const carrierAdded = await carrierEntry.save();
  res.redirect('/Carrier');
});

//edit carrier
app.get('/editCarrier/:id', (req, res) => {
  carrierData.findById(req.params.id, (err, carrierData) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.render("carrierEdit",{carrier:carrierData});
    }
  })
})
app.post('/editCarrier/:id', (req, res) => {
  carrierData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedData) => {
    if (err) return res.status(500).send(err);
    res.redirect('/carrier');
  });
});

//delete carrier
app.get("/deleteCarrier/:id", (req, res)=>{
  carrierData.findByIdAndRemove(req.params.id, (err) =>{
    if (err) return console.error(err);
    res.redirect('/carrier');
  });
});

// Sea Cargo routing
app.get("/seaCargo",async(req,res)=>{
  const seaCargoEntries = await seaCargoData.find({});
  const seaOrigins = await portData.find({type: "originSeaPort"});
  const seaDestinations = await portData.find({type: "destinationSeaPort"});
  const seaCarriers = await carrierData.find({type: "seaCargoCarrier"});
  res.render("seaCargo",{seaCargoEntries,seaOrigins,seaDestinations,seaCarriers});
});
app.post("/submitSeaCargo",async(req,res)=>{
  if (!req.body.originSeaPort || !req.body.originSeaPort || !req.body.seaCargoType || !req.body.seaContainerType || !req.body.seaCargoFreeTime || !req.body.seaCargoTransitTime || !req.body.seaCargoCarrier || !req.body.seaCargoTerms || !req.body.seaCargoPrice || !req.body.seaCargoValidityDate) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const seaCargoEntry = new seaCargoData({
    seaPortOrigin: req.body.originSeaPort,
    seaPortDestination: req.body.destinationSeaPort,
    seaCargotype: req.body.seaCargoType,
    seaContainerType: req.body.seaContainerType,
    seaFreeTime: req.body.seaCargoFreeTime,
    seaTransitTime: req.body.seaCargoTransitTime,
    seaCarrier: req.body.seaCargoCarrier,
    seaTerms: req.body.seaCargoTerms,
    seaCargoPrice: req.body.seaCargoPrice,
    seaCargoValidityDate: req.body.seaCargoValidityDate,
  });
  const seaCargo = await seaCargoEntry.save();
  res.redirect("/seaCargo");
});
app.get('/editSeaCargo/:id', async(req, res) => {
  const seaOrigins = await portData.find({type: "originSeaPort"});
  const seaDestinations = await portData.find({type: "destinationSeaPort"});
  const seaCarriers = await carrierData.find({type: "seaCargoCarrier"});
  seaCargoData.findById(req.params.id, (err, seaCargoData) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.render("seaCargoEdit",{seaCargo:seaCargoData,seaOrigins,seaDestinations,seaCarriers});
    }
  })
});
app.post('/editSeaCargo/:id', (req, res) => {
  carrierData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedData) => {
    if (err) return res.status(500).send(err);
    res.redirect('/seaCargo');
  });
});
app.get("/deleteSeaCargo/:id", (req, res)=>{
  seaCargoData.findByIdAndRemove(req.params.id, (err) =>{
    if (err) return console.error(err);
    res.redirect('/seaCargo');
  });
});
// air cargo routing
app.get("/airCargo",async(req,res)=>{
  const airCargoEntries = await airCargoData.find({});
  const airOrigins = await portData.find({type: "originAirPort"});
  const airDestinations = await portData.find({type: "destinationAirPort"});
  const airCarriers = await carrierData.find({type: "airCargoCarrier"});
  res.render("airCargo",{airCargoEntries,airOrigins,airDestinations,airCarriers});
});
app.post("/submitAirCargo",async(req,res)=>{
  if (!req.body.originAirPort || !req.body.originAirPort || !req.body.airCargoType || !req.body.airCargoWeight || !req.body.airCargoFreeTime || !req.body.airCargoTransitTime || !req.body.airCargoCarrier || !req.body.airCargoTerms || !req.body.airCargoPrice || !req.body.airCargoValidityDate) {
    return res.status(400).send({ error: 'All fields are required' });
  }
  const airCargoEntry = new airCargoData({
    airPortOrigin: req.body.originAirPort,
    airPortDestination: req.body.destinationAirPort,
    airCargotype: req.body.airCargoType,
    airCargoWeight: req.body.airCargoWeight,
    airFreeTime: req.body.airCargoFreeTime,
    airTransitTime: req.body.airCargoTransitTime,
    airCarrier: req.body.airCargoCarrier,
    airTerms: req.body.airCargoTerms,
    airCargoPrice: req.body.airCargoPrice,
    airCargoValidityDate: req.body.airCargoValidityDate,
  });
  const airCargo = await airCargoEntry.save();
  res.redirect("/airCargo");
});
app.get('/editAirCargo/:id', async(req, res) => {
  const airOrigins = await portData.find({type: "originAirPort"});
  const airDestinations = await portData.find({type: "destinationAirPort"});
  const airCarriers = await carrierData.find({type: "airCargoCarrier"});
  airCargoData.findById(req.params.id, (err, airCargoData) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.render("airCargoEdit",{airCargo:airCargoData,airOrigins,airDestinations,airCarriers});
    }
  })
});
app.post('/editAirCargo/:id', (req, res) => {
  airCargoData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedData) => {
    if (err) return res.status(500).send(err);
    res.redirect('/airCargo');
  });
});
app.get("/deleteAirCargo/:id", (req, res)=>{
  airCargoData.findByIdAndRemove(req.params.id, (err) =>{
    if (err) return console.error(err);
    res.redirect('/airCargo');
  });
}); 
// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});


