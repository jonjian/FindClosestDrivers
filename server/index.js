const express = require("express");
const helpers = require("./serverHelpers")
const shipments = require("../data/shipments.json");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/dispatch", (req, res) => {
  helpers.renderWork().then(
    result => res.send({ express: result 
  }));
});

app.listen(port, () => console.log(`Boltapp Express proxy running on port ${port}`));
