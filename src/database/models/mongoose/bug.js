import mongoose from "mongoose";

import BugClass from "../../../domain/bug";

let hemisphereSchema = mongoose.Schema({
  direction: {
    type: String,
    required: true,
    enum: ["North", "South"],
  },
  months: [String],
});

let scheduleSchema = mongoose.Schema({
  startingTime: {
    type: Number,
  },
  endingTime: {
    type: Number,
  },
  allDay: {
    type: Boolean,
    required: false,
  },
});

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
  schedule: scheduleSchema,
  hemispheres: [hemisphereSchema],
});

bugSchema.loadClass(BugClass);
let Bug = mongoose.model("Bug", bugSchema);
module.exports = Bug;
//export default mongoose.model('Bug', bugSchema)
