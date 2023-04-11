const mongoose = require(`mongoose`);

const reviewSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: [true, `please provide valid doctor id`],
    },
    subscriberId: {
      type: String,
      ref: "users",
      required: [true, `please provide valid subscriber id`],
    },
    appointmentId: {
      type: String,
      ref: "appointments",
      required: [true, `please provide valid appointment id`],
    },
    comment: {
      type: String,
    },
    starRating: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model(`Review`, reviewSchema);

module.exports = Review;
