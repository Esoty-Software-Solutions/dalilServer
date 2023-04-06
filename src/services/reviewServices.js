const ReviewSchema = require("../schemas/reviewSchema");

exports.addReview = async (query) => {
  return await ReviewSchema.create(query);
};
exports.getDoctorReviews = async (query, limit) => {
  console.log(query)
  return await ReviewSchema.find(query)
    .populate("doctorId")
    .select("-__v ");
};