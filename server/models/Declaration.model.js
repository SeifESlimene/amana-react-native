const mongoose = require("mongoose");

const { Schema } = mongoose;

const STypes = {type: String, required: true }
const NTypes = {type: Number, required: true }

const declarationSchema = new Schema(
  {
    name: STypes,
    photo: STypes,
    person: STypes,
    place: STypes,
    phone: NTypes,
    cin: NTypes,
  },
  {
    timestamps: true,
  }
);

const Declaration = mongoose.model("Declaration", declarationSchema);

module.exports = Declaration;
