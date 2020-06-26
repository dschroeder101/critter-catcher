import mongoose from "mongoose";

import BugClass from "../../../domain/bug";
import HemisphereSchema from "./hemisphere"
import ScheduleSchema from "./schedule";

let bugSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  schedules: [ScheduleSchema],
  hemispheres: [HemisphereSchema],
});

bugSchema.loadClass(BugClass);
let Bug = mongoose.model("Bug", bugSchema);
module.exports = Bug;