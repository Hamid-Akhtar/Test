var mongoose = require("mongoose");
var express = require("express");
const cors = require("cors");
var app = express();
var database = require("./config/database");
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override");
var fs = require("fs");
var Test = require("./models/test");
const req = require("express/lib/request");
var port = process.env.PORT || 5500;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(database.url);
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(`err: ${err}`);
});
db.on("connected", (err, res) => {
  console.log("Connected to database!");
});

app.listen(port);
console.log("App listening on port : " + port);

// SCRIPT TO READ JSON FILE DATA.
let centersData = fs.readFileSync("centers.json");
let center = JSON.parse(centersData);
center.forEach((element) => {
  // console.log("here is data", element);
  var newCenters = new Test(element);
  newCenters.title = element.title;
  newCenters.phonne = element.phonne;
  //in case if we want to save above data in database, run this code.
  // newCenters.save((err, s) => {
  //   if (err) {
  //     console.log("error", err);
  //   }
  //   console.log("saved into DB successfully");
  // });
});
const centerController = require("./controllers/centers");

app.get("/api/getCenters", centerController.getCenters);

app.get("/api/getCenter/:id", centerController.getCenter);

// create center and send back all centers data after creation
app.post("/api/addCenter", centerController.createCenter);

// update center and send back all centers after creation
app.put("/api/updateCenter/:id", centerController.updateCenter);

// delete a center by id
app.delete("/api/deleteCenter/:id", centerController.deleteCenter);
