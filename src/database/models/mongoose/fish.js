import mongoose from "mongoose";

import FishClass from "../../../domain/fish";

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
  isFin: {
    type: Boolean,
    required: true,
  },
  schedule: scheduleSchema,
  hemispheres: [
    hemisphereSchema
  ],
});

FishSchema.loadClass(FishClass);

export default mongoose.model("Fish", FishSchema);
