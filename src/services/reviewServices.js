const ReviewSchema = require("../schemas/ reviewSchema");
const { ObjectId } = require("mongodb");
const doctor = require("../schemas/doctorSchema");

exports.addReview = async (query) => {
  return await ReviewSchema.create(query);
};
exports.getDoctorReviews = async (query, limit) => {
  return await ReviewSchema.find(query).populate("doctorId").select("-__v ");
};

exports.updateRatings = async (doctorId) => {
  try {
    let data = await ReviewSchema.aggregate([
      {
        $match: { doctorId: ObjectId(doctorId) },
      },
      {
        $group: {
          _id: "$doctorId",
          starRating: { $avg: "$starRating" },
          commentCount: { $sum: 1 },
        },
      },
    ]);
    if (data.length) {
      data = data[0];

      await doctor.updateOne({ doctorId: data._id }, data);
    }
  } catch (err) {
    console.log(err);
  }
};
