import mongoose from "mongoose";

import BugClass from "../../../domain/bug";

const BugSchema = mongoose.Schema({
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

BugSchema.loadClass(BugClass);

export default mongoose.model("Bug", BugSchema);
