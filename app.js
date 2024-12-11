const debug = require("debug")("app");
const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const app = express();


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


app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// ------------ ROUTES ------------ //

//Main Page
app.get('/', (req, res) => {
  res.render('index');
});

//Add House
app.get('/house/add', (req, res) => {
  res.redirect('/');
});

//Delete House 
app.get('/house/:houseId/delete', (req, res) => {
  res.redirect('/');
});

// House Bids
app.get('/house/:houseId/bids', (req, res) => {
  res.render("houseBids");
});

//Add a Bid for a specified House
app.get('/house/:houseId/bid/add', (req,res) => {
  res.render("houseBids")
});

//Remove a Bid on a specified house
app.get('/house/:houseId/bid/:bidId/delete', (req,res) => {
  res.render("houseBids")
});

