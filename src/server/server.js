const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Bug = require("../database/models/mongoose/bug");
const Fish = require("../databse/models/mongoose/fish");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@critter-catcher1-is7lo.azure.mongodb.net/critter-catcher1?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

createAndSaveBug = function (done) {
  let commonButterFly = new Bug({
    name: "Common Butterfly",
    price: 160,
    location: "Flying",
    schedule: {
      startingTime: 4,
      endingTime: 19,
      allDay: false,
    },
    hemispheres: [
      {
        direction: "Northern",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      {
        direction: "Southern",
        months: [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "Decemeber",
        ],
      },
    ],
  });
};

app.get("/critters/:hemisphere/:currentTime", (req, res) => {
  res.json({
    hemisphere: req.params.hemisphere,
    currentTime: req.params.currentTime,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
