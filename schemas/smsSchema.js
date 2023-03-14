const mongoose = require(`mongoose`);

const smsSchema = mongoose.Schema({
  smsId: {
    type: String,
    unique: true,
    required: [true, `please provide valid sms Id`],
  },
  messageStatus: {
    type: String,
    enum: ["pending", "sent"],
    required: [true, `please specify messageStatus with either pending or sent `],
  },
  phoneNumber: {
    type: String,
    required: [true, `please specify a phoneNumber `],
  },
  messageContent: {
    type: String,
    required: [true, `please specify a messageContent `],
  }
  
  
}, { collection: 'sms' });

const sms = mongoose.model(`sms`, smsSchema);

module.exports = sms;
