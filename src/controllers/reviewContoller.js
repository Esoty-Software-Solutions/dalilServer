const mongoose = require("mongoose");
const ReviewServices = require("../services/reviewServices");
const doctor = require("../schemas/doctorSchema");
const { ObjectId } = require("mongodb");

//----------Add Review------------------------------------------------\\
const AddReview = async (req, res) => {
  try {
    let doctorId = req.params.doctorId;
    const review = await ReviewServices.addReview({
      ...req.body,
      doctorId: doctorId,
    });
    await ReviewServices.updateRatings(review.doctorId);
    const responseBody = {
      codeStatus: "201",
      message: "review added",
      data: review,
    };
    return res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AllDoctorReviews = async (req, res) => {
  try {
    let doctorId = req.params.doctorId;

    let documents = await ReviewServices.getDoctorReviews({
      doctorId: mongoose.Types.ObjectId(doctorId),
    });
    const responseBody = {
      codeStatus: "200",
      message: "",
      data: documents,
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AddReview,
  AllDoctorReviews,
};
