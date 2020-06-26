import mongoose from "mongoose";

import HemisphereClass from "../../../domain/hemisphere.mjs";

const HemisphereSchema = mongoose.Schema({
  direction: {
    type: String,
    required: true,
    enum: ["North", "South"],
  },
  months: [String],
});

HemisphereSchema.loadClass(HemisphereClass);

export default HemisphereSchema;