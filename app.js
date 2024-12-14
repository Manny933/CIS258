const debug = require("debug")("app");
const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const { getHouseInfo, addHouse, deleteHouse, getBids, addBid, deleteBid } = require('./src/controllers/houseController');





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    debug(`listening on port ${chalk.blue(PORT)}`);
  });
  
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "css")
  )
);
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://ecorrea424:ZjwZet0d8YTQ3zhl@cluster0.jmw6g.mongodb.net/houses");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));

db.once("open", () => {
  debug(chalk.bgBlue.whiteBright.bold("MongoDB Connected Successfully"));
});

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");


// ------------ ROUTES ------------ //

//Main Page


app.get("/", getHouseInfo);



//Add House
app.get('/house/add', addHouse);

//Delete House 
app.get('/house/:id/delete', deleteHouse);


// House Bids
app.get('/house/:id/bids', getBids);

//Add a Bid for a specified House
app.get('/house/:id/bid/add', addBid); 

//Remove a Bid on a specified house
app.get('/house/:id/bid/:bidId/delete', deleteBid)


