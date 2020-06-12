const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bug = require("./../database/models/mongoose/bug");
const Fish = require("./../database/models/mongoose/fish");
const cors = require("cors");

console.log(require("dotenv").config());

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@critter-catcher1-is7lo.azure.mongodb.net/critters?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("Error while connecting to the database - " + error);
  });

app.get("/critters/:hemisphere/:currentTime", (req, res) => {
  res.json({
    hemisphere: req.params.hemisphere,
    currentTime: req.params.currentTime,
  });
});

app.post("/critters/bugs/create", (req, res) => {
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
        direction: "North",
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
        direction: "South",
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
          "December",
        ],
      },
    ],
  });

  var promise = commonButterFly.save();

  promise.then(function (doc) {
    console.log(doc.name);
    res.status(201).end();
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).end();
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
