import mongoose from "mongoose";

import BugClass from "../../../domain/bug.mjs";
import HemisphereSchema from "./hemisphere.mjs"
import ScheduleSchema from "./schedule.mjs";

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
export default Bug;