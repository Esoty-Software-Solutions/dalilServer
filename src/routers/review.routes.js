var express = require("express");
const {
    AddReview,
    AllDoctorReviews
} = require("../controllers/reviewContoller");
const { checkToken } = require("../utilities/tokenAuth");

var router = express.Router();

router.post("/addReview/:doctorId", AddReview);
router.get("/reviews/:doctorId", AllDoctorReviews);

module.exports = router;
