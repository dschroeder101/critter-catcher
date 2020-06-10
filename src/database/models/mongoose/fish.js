import mongoose from "mongoose";

import FishClass from "../../../domain/fish";

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
  schedule: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  hemispheres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hemisphere",
      required: true,
    },
  ],
});

FishSchema.loadClass(FishClass);

export default mongoose.model("Fish", FishSchema);
