import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema: mongoose.Schema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name"
  },

  lastName: {
    type: String,
    required: "Enter a last name"
  },

  email: {
    type: String,
    unique: true
  },

  company: {
    type: String
  },

  phone: {
    type: Number,
    unique: true
  }
},
  { timestamps: true }
);