import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Bug from "./database/models/mongoose/bug.mjs";
import Fish from "./database/models/mongoose/fish.mjs";
import cors from "cors";
import path from "path";
import redis from "redis";
import crypto from "crypto";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();
const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on("connect", function () {
  console.log("Redis client connected");
});

redisClient.on("error", function (err) {
  console.log("Something went wrong" + err);
});

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
  let hash = crypto
    .createHash("md5")
    .update(req.params.hemisphere + req.params.month + req.params.hour + "fish")
    .digest("hex");

  redisClient.get(hash, function (error, result) {
    if (result) {
      console.log("Returning cached fish result from redis...");
      return res.status(200).json(JSON.parse(result));
    } else {
      console.log("Retrieving currently available fish from database...");
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
          redisClient.set(hash, JSON.stringify(doc));

          res.status(200).json(doc);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
});

app.get("/critters/bugs/:hemisphere/:month/:hour/", (req, res) => {
  let hash = crypto
    .createHash("md5")
    .update(req.params.hemisphere + req.params.month + req.params.hour + "bugs")
    .digest("hex");

  redisClient.get(hash, function (error, result) {
    if (result) {
      console.log("Returning cached bugs result from redis...");
      return res.status(200).json(JSON.parse(result));
    } else {
      console.log("Retrieving currently available bugs from database...");

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
          redisClient.set(hash, JSON.stringify(doc));
          res.status(200).json(doc);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
