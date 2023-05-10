const mongoose = require("mongoose");
const ReviewServices = require("../services/reviewServices");
const AppointmentServices = require("../services/appointmentServices");
const {successResponse, badRequestErrorResponse, notFoundResponse, serverErrorResponse} = require('../utilities/response');
const { getOne, createOne } = require("../services/commonServices");
const AppointmentSchema = require("../schemas/appointmentSchema");
const ReviewSchema = require("../schemas/reviewSchema");

//----------Add Review------------------------------------------------\\
const AddReview = async (req, res) => {
  try {
    let doctorId = req.params.doctorId;
    // let appointment = AppointmentServices.getAppointmentDetails({ _id: req.body.appointmentId});
    let appointment = await getOne({
      schemaName : AppointmentSchema,
      body : {_id: req.body.appointmentId}
      });

    if(appointment.status === 'completed') {
      // const review = await ReviewServices.addReview({
      //   ...req.body,
      //   doctorId: doctorId,
      // });
      const review = await createOne({
        schemaName : ReviewSchema, 
        body : {
          ...req.body,
          doctorId: doctorId,
        }
      });
      // custom service
      await ReviewServices.updateRatings(review.doctorId);
      
      return successResponse(res, "Review Added successfully", {});
    } else {
      return serverErrorResponse(res, 'Please complete appointment to add review');
    }
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error);
  }
};

const AllDoctorReviews = async (req, res) => {
  try {
    let doctorId = req.params.doctorId;

    // let documents = await ReviewServices.getDoctorReviews({
    //   doctorId: mongoose.Types.ObjectId(doctorId),
    // });
    let documents = await getOne({
      schemaName : ReviewSchema,
      body : {doctorId: mongoose.Types.ObjectId(doctorId)}
    });
    const responseBody = {
      codeStatus: "200",
      message: "",
      data: documents,
    };

    return successResponse(res, "Reviews", responseBody);

  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error);
  }
};

module.exports = {
  AddReview,
  AllDoctorReviews,
};
