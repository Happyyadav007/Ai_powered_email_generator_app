const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    to: { type: String },
    subject: { type: String },
    text: { type: String },
    attachments: [
        {
            filename: String,
            path: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Draft", DraftSchema);
