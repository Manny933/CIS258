const debug = require("debug")("app");
const chalk = require("chalk");
const morgan = require("morgan");
const express = require("express");
const path = require("path");




const PORT = process.env.PORT || 4000;
const app = express();
app.listen(PORT, () => {
    debug(`listening on port ${chalk.blue(PORT)}`);
  });
  
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

// ------------ ROUTES ------------ //

//Main Page
app.get('/', (req, res) => {
  res.send('<h1>Houses currently on the market</h1>');
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
  res.send('<h1>Bids of house displayed here</h1>');
});

//Add a Bid for a specified House
app.get('/house/:houseId/bid/add', (req,res) => {
  res.redirect('/house/:houseId/bids')
});

//Remove a Bid on a specified house
app.get('/house/:houseId/bid/:bidId/delete', (req,res) => {
  res.redirect('/house/:houseId/bids')
});