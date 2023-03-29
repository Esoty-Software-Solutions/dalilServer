const mongoose = require(`mongoose`);

const smsSchema = mongoose.Schema(
  {
    status: { type: String, enum: ["pending", "sent"], default: "pending" },

    phone: {
      type: String,
      required: [true, `please provide valid phone number`],
    },

    message: {
      type: String,
      required: [true, `message can not be empty`],
    },
  },
  { timestamps: true }
);

const sms = mongoose.model(`sms`, smsSchema);

module.exports = sms;
