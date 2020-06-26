import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Bug from "./database/models/mongoose/bug.mjs";
import Fish from "./database/models/mongoose/fish.mjs";
import cors from "cors";
import path from "path";

//require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

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
  .catch((error) => {
    console.log("Error while connecting to the database - " + error);
  });

mongoose.connection.on("connected", () => {
  console.log("Connection opened");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection encountered an error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection has disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose connection has disconnected due to application termination"
    );
    process.exit(0);
  });
});

app.get("/critters/fish", (req, res) => {
  var query = Fish.find({});

  query
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/critters/bugs", (req, res) => {
  var query = Bug.find({});

  query
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/critters/fish/:hemisphere/:month/:hour/", (req, res) => {
  console.log("Retrieving currently available fish...");
  const hemisphere = req.params.hemisphere;
  const month = req.params.month;
  const hour = req.params.hour;

  let query = Fish.find({
    $or: [
      {
        // Hemispheres[hemisphere] contains month
        //AND there is at least one schedule that has a starting time <= current hour and ending time >= current hour
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            schedules: {
              $elemMatch: {
                startingTime: { $lte: hour },
                endingTime: { $gte: hour },
              },
            },
          },
        ],
      },
      {
        // Hemispheres[hemisphere] contains month
        // AND there is a schedule that has startTime > endTime
        // AND that schedule startingTime <= hour OR that schedule endingTime >= hour
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            $expr: {
              $gt: ["$schedules.startingTime", "$schedules.endingTime"],
            },
          },

          {
            $or: [
              {
                schedules: {
                  $elemMatch: { startingTime: { $lte: hour } },
                },
              },
              {
                schedules: {
                  $elemMatch: { endingTime: { $gte: hour } },
                },
              },
            ],
          },
        ],
      },
      {
        // Current Hemisphere contains month
        // AND there is a schedule that has allDay = true
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            schedules: {
              $elemMatch: { allDay: true },
            },
          },
        ],
      },
    ],
  });

  query
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/critters/bugs/:hemisphere/:month/:hour/", (req, res) => {
  console.log("Retrieving currently available bugs...");

  const hemisphere = req.params.hemisphere;
  const month = req.params.month;
  const hour = req.params.hour;

  let query = Bug.find({
    $or: [
      {
        // Hemispheres[hemisphere] contains month
        //AND there is at least one schedule that has a starting time <= current hour and ending time >= current hour
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            schedules: {
              $elemMatch: {
                startingTime: { $lte: hour },
                endingTime: { $gte: hour },
              },
            },
          },
        ],
      },
      {
        // Hemispheres[hemisphere] contains month
        // AND there is a schedule that has startTime > endTime
        // AND that schedule startingTime <= hour OR that schedule endingTime >= hour
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            $expr: {
              $gt: ["$schedules.startingTime", "$schedules.endingTime"],
            },
          },

          {
            $or: [
              {
                schedules: {
                  $elemMatch: { startingTime: { $lte: hour } },
                },
              },
              {
                schedules: {
                  $elemMatch: { endingTime: { $gte: hour } },
                },
              },
            ],
          },
        ],
      },
      {
        // Current Hemisphere contains month
        // AND there is a schedule that has allDay = true
        $and: [
          {
            hemispheres: {
              $elemMatch: { direction: hemisphere, months: month },
            },
          },
          {
            schedules: {
              $elemMatch: { allDay: true },
            },
          },
        ],
      },
    ],
  });

  query
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.post("/critters/fish/create", (req, res) => {
  let bitterling = new Fish({
    name: "Bitterling",
    price: "900",
    location: "River",
    shadowSize: "Extra Small",
    hasFin: false,
    hemispheres: [
      {
        direction: "North",
        months: ["January", "February", "March", "November", "December"],
      },
      {
        direction: "South",
        months: ["May", "June", "July", "August", "September"],
      },
    ],
    schedules: [
      {
        startingTime: 0,
        endingTime: 0,
        allDay: true,
      },
    ],
  });

  var promise = bitterling.save();

  promise
    .then(function (doc) {
      console.log(doc.name);
      res.status(201).end();
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).end();
    });
});

app.post("/critters/updateSchema", (req, res) => {
  var promise = Bug.update(
    { schedules: { $exists: false } },
    { schedules: [{ startingTime: 0, endingTime: 0, allDay: false }] },
    { multi: true },
    function (err, numberAffected) {
      console.log(err);
      console.log(numberAffected);
    }
  );

  promise
    .then(function () {
      res.status(201).end();
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).end();
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

  promise
    .then(function (doc) {
      console.log(doc.name);
      res.status(201).end();
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).end();
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));