const mongoose = require('mongoose');
const ReviewServices = require("../services/reviewServices");
const doctor = require("../schemas/doctorSchema");

//----------Add Review------------------------------------------------\\
const AddReview = async (req, res) => {
  try {
    console.log('req.body', req.body)
    let doctorId = req.params.doctorId;
    const review = await ReviewServices.addReview({
      ...req.body,
      doctorId: doctorId
    });
    console.log("review",review);
    await _updateRatings(review.doctorId);
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
   
    let documents = ReviewServices.getDoctorReviews({ doctorId: mongoose.Types.ObjectId(doctorId)});

    const responseBody = {
      codeStatus: "200",
      message: '',
      data: documents
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    AddReview,
    AllDoctorReviews
};

_updateRatings = async (doctorId) => {
  try {
    let data = await Review.aggregate([
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
    console.log("data",data);
    if (data.length) {
      data = data[0];
  
      await doctor.updateOne({ doctorId: data._id }, data);
    }
  } catch (err) {
    console.log(err);
  }
};