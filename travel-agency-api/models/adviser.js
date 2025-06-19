const mongoose = require("mongoose");
const { Schema } = mongoose;

const adviserSchema = new Schema(
  {
    name: { type: String, required: true },
    tags: { type: [String] },
    image: { type: String },
    present: { type: String },
    from: { type: String },
    // desc: { type: String },
    desc: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    phone: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

const Adviser = mongoose.model("Adviser", adviserSchema);

module.exports = Adviser;
