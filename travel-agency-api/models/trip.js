const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    // title: { type: String, required: true },
    title: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    // summary: { type: String },
    summary: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    region: { type: Number },
    town: { type: String },
    // desc: { type: String },
    desc: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
    },
    category: { type: String },
    images: { type: [String] },
    duration: { type: Number },
    adultPrice: { type: Number },
    youngPrice: { type: Number },
    tags: { type: [String] },
  },
  { timestamps: true }
);

// const Trip = mongoose.model("Trip", tripSchema);

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

module.exports = Trip;
