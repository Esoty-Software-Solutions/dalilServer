const mongoose = require(`mongoose`);

const refreshTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, `please provide valid doctor id`],
    },
    refreshToken: {
      type: String,
      required: [true, `please provide valid refresh token`],
    },
    expiryDate: {
      type: Date,
      required: [true, `please provide valid appointment id`],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const RefreshToken = mongoose.model(`RefreshToken`, refreshTokenSchema);

module.exports = RefreshToken;
