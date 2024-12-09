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

