"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ContactSchema = new Schema({
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
}, { timestamps: true });
//# sourceMappingURL=index.js.map