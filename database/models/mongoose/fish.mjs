import mongoose from "mongoose";

import FishClass from "../../../domain/fish.mjs";
import HemisphereSchema from "./hemisphere.mjs"
import ScheduleSchema from "./schedule.mjs";

const FishSchema = mongoose.Schema({
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
  shadowSize: {
    type: String,
    required: true,
    enum: [
      "Narrow",
      "Extra Small",
      "Small",
      "Medium",
      "Large",
      "Extra Large",
      "Giant",
    ],
  },
  hasFin: {
    type: Boolean,
    required: true,
  },
  hemispheres: [
    HemisphereSchema
  ],
  schedules: [ScheduleSchema]
});

FishSchema.loadClass(FishClass);
let Fish = mongoose.model("Fish", FishSchema);
export default Fish;