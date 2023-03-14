//importing appointments collection
// const { find } = require("../schemas/appointmentSchema");
const appointment = require(`../schemas/appointmentSchema`);
const medicalCenter = require(`../schemas/medicalCenterSchema`);
const doctor = require(`../schemas/doctorSchema`);
const schedule = require(`../schemas/scheduleSchema`);
// importing dependencies
const mongo = require("mongodb");
const mongoose = require(`mongoose`);
// api for creating appointment
const createAppointment = async (req, res) => {
  try {
    console.log("creating an appointment");
    const userId = res.locals.user.userId;
    // const idNumber = Number(userId.split(`-`)[1]);
    // const doc = await appointment.find({});
    // // const appointmentDoc = await appointment.find(req.params);
    // if (req.params.userId !== userId) {
    //   return res.status(401).json({ message: `Not Authorized` });
    // }

    if (req.body.doctorId) {
      console.log(req.body.doctorId);
      req.body.doctorId = (req.body.doctorId);
      console.log(req.body.doctorId);
    }
    if (req.body.medicalCenterId) {
      console.log(req.body.medicalCenterId);
      req.body.medicalCenterId = (
        req.body.medicalCenterId
      );
      console.log(req.body.medicalCenterId);
    }

    if (req.body.scheduleId) {
      console.log(req.body.scheduleId);
      req.body.scheduleId = (req.body.scheduleId);
      console.log(req.body.scheduleId);
    }

    // Temp fix till we get a proper ID for patients
    if (req.body.patient.patientId) {
      console.log(req.body.scheduleId);
      req.body.scheduleId = (req.body.scheduleId);
      console.log(req.body.scheduleId);
    }

    const medicalCenterObject = await medicalCenter
      .findOne({ medicalCenterId: req.body.medicalCenterId })
      .lean();
    const doctorObject = await doctor
      .findOne({ doctorId: req.body.doctorId })
      .lean();
    const scheduleObject = await schedule
      .findOne({ scheduleId: req.body.scheduleId })
      .lean();

    const document = await appointment.create({
      ...req.body,
      userId: req.params.userId,
      appointmentStatus: `pending`,
      appointmentId: new mongoose.Types.ObjectId().toString(),
      dateCreated: Date(),
      medicalCenterObject: medicalCenterObject,
      doctorObject: doctorObject,
      scheduleObject: scheduleObject,
    });

    let message = "good";
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: document,
    };

    return res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for updating appointment
const updateAppointment = async (req, res) => {
  try {
    if (req.params.appointmentId) {
      console.log(req.params.appointmentId);
      req.params.appointmentId = (
        req.params.appointmentId
      );
      console.log(req.params.appointmentId);
    }
    const document = await appointment
      .findOneAndUpdate(
        {
          appointmentId: req.params.appointmentId,
          // userId: res.locals.user.userId,
        },
        {
          ...req.body,
          lastUpdateDate: Date(),
        },
        {
          new: true,
        }
      )
      .lean();
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }

    const response = await appointment
      .aggregate([
        {
          $match: {
            appointmentId: req.params.appointmentId,
            userId: document.userId,
          },
        },
        {
          $lookup: {
            from: `medicalCenters`,
            localField: `medicalCenterId`,
            foreignField: `medicalCenterId`,
            as: `medicalcenter`,
          },
        },
        {
          $lookup: {
            from: `doctors`,
            localField: `doctorId`,
            foreignField: `doctorId`,
            as: `doctor`,
          },
        },
      ])
      .exec();
    response.forEach((each) => {
      delete each.sd;
    });

    let message = "good";
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: response[0],
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const specificAppointment = async (req, res) => {
  try {
    const bookedQP = req.query.booked ?? "true";
    const cancelledQP = req.query.cancelled ?? "true";
    const rejectedQP = req.query.rejected ?? "true";
    const completedQP = req.query.completed ?? "true";
    const pendingQP = req.query.pending ?? "true";
    const starting_after_objectQP = req.query.starting_after_object;
    let limitQP = Number(req.query.limit) ?? 30;

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    let bookingStatusQP = [];
    if (bookedQP === "true") bookingStatusQP.push("booked");
    if (cancelledQP === "true") bookingStatusQP.push("cancelled");
    if (rejectedQP === "true") bookingStatusQP.push("rejected");
    if (completedQP === "true") bookingStatusQP.push("completed");
    if (pendingQP === "true") bookingStatusQP.push("pending");

    // console.log(bookingStatusQP);

    let query = {};
    query["$and"] = [];
    query["$and"].push({ userId: { $eq: req.params.userId } });
    query["$and"].push({ appointmentStatus: { $in: bookingStatusQP } });

    let objectCount = 0;
    let hasMore = true;

    if (query["$and"].length === 0) {
      objectCount = await appointment.find({}).countDocuments();
      if (starting_after_objectQP)
        query["$and"].push({
          appointmentId: {
            $gt: (starting_after_objectQP),
          },
        });
      documents = await appointment
        .find({})
        .sort({ appointmentId: 1, _id: 1 })
        .limit(limitQP)
        .lean();
      lastDocument = await appointment
        .findOne(query)
        .sort({ appointmentId: -1, _id: -1 })
        .lean();
    } else {
      objectCount = await appointment.find(query).countDocuments();
      if (starting_after_objectQP)
        query["$and"].push({
          appointmentId: {
            $gt: (starting_after_objectQP),
          },
        });
      documents = await appointment
        .find(query)
        .sort({ appointmentId: 1, _id: 1 })
        .limit(limitQP)
        .lean();
      documents = await appointment.aggregate([
        {
          $lookup: {
            from: `medicalCenters`,
            localField: `medicalCenterId`,
            foreignField: `medicalCenterId`,
            as: `medicalCenterObject`,
          },
        },
        {
          $lookup: {
            from: `doctors`,
            localField: `doctorId`,
            foreignField: `doctorId`,
            as: `doctorObject`,
          },
        },
        {
          $match: {
            $and: query["$and"],
          },
        },
        { $sort: { appointmentId: 1, _id: 1 } },
        { $limit: limitQP },
      ]);
      lastDocument = await appointment
        .findOne(query)
        .sort({ appointmentId: -1, _id: -1 })
        .lean();
    }
    // console.log(lastDocument.appointmentId)
    // console.log("length is " + documents.length)
    // console.log(documents[0])
    documents.forEach((document) => {
      // if (document.appointmentId.equals(lastDocument.appointmentId))
      //   hasMore = false;
    });

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
      hasMore = false;
    }

    documents.forEach((document) => {
      // if (document.appointmentId.equals(lastDocument.appointmentId))
      //   hasMore = false;
      document.doctorObject = document.doctorObject[0];
      document.medicalCenterObject = document.medicalCenterObject[0];
      // document.patient.birthDate = document.patient.birthDate
      // .toISOString()
      // .split("T")[0];
      document.patient.age = Math.floor(Math.random() * 91);
      document.patient.patientId = "LCS-1905-13";
      // console.log(document.appointmentDate.toISOString().split('T')[0])
      // document.appointmentDate = document.appointmentDate
      //   .toISOString()
      //   .split("T")[0];
    });

    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: objectCount,
        hasMore,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const doctorAppointmentSummaries = async (req, res) => {
  try {
    const bookedQP = req.query.booked ?? "true";
    // const cancelledQP = req.query.cancelled ?? "true";
    // const rejectedQP = req.query.rejected ?? "true";
    // const completedQP = req.query.completed ?? "true";
    // const pendingQP = req.query.pending ?? "true";
    // const starting_after_objectQP = req.query.starting_after_object;
    // const limitQP = Number(req.query.limit) ?? 30;

    let addDates = 10;

    const todaysDate = new Date("January 12, 2023");
    const futureDate = new Date("January 12, 2023");
    futureDate.setDate(futureDate.getDate() + addDates);

    let bookingStatusQP = [];
    if (bookedQP === "true") bookingStatusQP.push("booked");
    // if(cancelledQP === "true")bookingStatusQP.push("cancelled");
    // if(rejectedQP === "true")bookingStatusQP.push("rejected");
    // if(completedQP === "true")bookingStatusQP.push("completed");
    // if(pendingQP === "true")bookingStatusQP.push("pending");

    let query = {};
    query["$and"] = [];
    query["$and"].push({ doctorId: { $eq: req.params.doctorId } });
    // query["$and"].push({"appointmentDate": {$gte: todaysDate.toISOString().split('T')[0]}});
    // query["$and"].push({"appointmentDate": {$lte: futureDate.toISOString().split('T')[0]}});

    // yourDate.toISOString().split('T')[0]

    documents = await appointment.aggregate([
      {
        $lookup: {
          from: `medicalCenters`,
          localField: `medicalCenterId`,
          foreignField: `medicalCenterId`,
          as: `medicalCenterObject`,
        },
      },
      {
        $lookup: {
          from: `doctors`,
          localField: `doctorId`,
          foreignField: `doctorId`,
          as: `doctorObject`,
        },
      },
      {
        $match: {
          $and: query["$and"],
        },
      },
      {
        $group: {
          _id: "$medicalCenterId",
          medicalCenterId: { $first: "$medicalCenterId" },
          medicalCenterName: { $first: "$medicalCenterObject.name" },
          appointmentDates: { $addToSet: "$appointmentDate" },
          expectedVisits: {
            $push: {
              date: "$appointmentDate",
              slot: "$timeslot",
            },
          },
        },
      },
      { $unwind: "$medicalCenterName" },
      // { $unwind: "$expectedVisits" },
      // {
      //   $group:
      //     {
      //       "_id": {
      //         "expectedVisits": "$expectedVisits",
      //         "medicalCenterName": "$medicalCenterName"
      //       },
      //       myCount: { $sum: 1 }
      //     }
      // },
      // { $group:
      //   {
      //     _id: null, uniqueValues: {$addToSet: "$expectedVisits.appointmentDate"}
      //   }
      // }
    ]);

    let dateArray = new Array();
    let currentDate = todaysDate;
    while (currentDate <= futureDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log(dateArray)
    console.log(documents.length);

    let objectCount = 0;
    let hasMore = true;
    // objectCount = await appointment.find(query,).countDocuments();

    // Creating the Body response
    let theSummary = new Array();
    for (let i = 0; i < documents.length; i++) {
      let medicalCenterId = documents[i].medicalCenterId;
      let medicalCenterName = documents[i].medicalCenterName;
      let theSummaryDateResults = new Array();
      for (let j = 0; j < dateArray.length; j++) {
        let date = dateArray[j].toISOString().split("T")[0];
        morningSlot = documents[i].expectedVisits.filter(
          (element) =>
            element.date.toISOString().split("T")[0] === date &&
            element.slot === "morning"
        ).length;
        afternoonSlot = documents[i].expectedVisits.filter(
          (element) =>
            element.date.toISOString().split("T")[0] === date &&
            element.slot === "afternoon"
        ).length;
        eveningSlot = documents[i].expectedVisits.filter(
          (element) =>
            element.date.toISOString().split("T")[0] === date &&
            element.slot === "evening"
        ).length;
        let datesResults = {
          date: date,
          morningSlot: morningSlot,
          afternoonSlot: afternoonSlot,
          eveningSlot: eveningSlot,
        };
        theSummaryDateResults.push(datesResults);
      }
      theSummary.push({
        medicalCenterId,
        medicalCenterName,
        expectedVisits: theSummaryDateResults,
      });
    }

    // if (starting_after_objectQP) query["$and"].push({"appointmentId": {$gt: starting_after_objectQP}});
    // documents = await appointment.find(query,).sort({appointmentId: 1}).limit(limitQP).lean();
    // lastDocument = await appointment.findOne(query,).sort({appointmentId: -1}).lean();

    // // console.log(lastDocument.appointmentId)
    // documents.forEach((document) => {
    //   if (document.appointmentId.equals(lastDocument.appointmentId)) hasMore = false;
    // });

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
      hasMore = false;
    }

    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: documents.length,
        hasMore,
        objectArray: theSummary,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const bookedQP = req.query.booked ?? "true";
    // const cancelledQP = req.query.cancelled ?? "true";
    // const rejectedQP = req.query.rejected ?? "true";
    // const completedQP = req.query.completed ?? "true";
    // const pendingQP = req.query.pending ?? "true";
    const starting_after_objectQP = req.query.starting_after_object;
    let limitQP = Number(req.query.limit) ?? 30;
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    let bookingStatusQP = [];
    if (bookedQP === "true") bookingStatusQP.push("booked");
    // if(cancelledQP === "true")bookingStatusQP.push("cancelled");
    // if(rejectedQP === "true")bookingStatusQP.push("rejected");
    // if(completedQP === "true")bookingStatusQP.push("completed");
    // if(pendingQP === "true")bookingStatusQP.push("pending");

    let query = {};
    query["$and"] = [];
    query["$and"].push({ doctorId: { $eq: req.params.doctorId } });
    query["$and"].push({ appointmentDate: { $eq: new Date(req.query.date) } });
    query["$and"].push({ timeslot: { $eq: req.query.timeSlot } });
    query["$and"].push({ medicalCenterId: { $eq: req.query.medicalCenterId } });
    if (starting_after_objectQP) {
      query["$and"].push({
        appointmentId: {
          $gt: (starting_after_objectQP),
        },
      });
    }

    documents = await appointment.aggregate([
      {
        $match: {
          $and: query["$and"],
        },
      },
      { $sort: { appointmentId: 1 } },
      { $limit: limitQP },
    ]);

    // console.log(dateArray)
    console.log(documents.length);

    let objectCount = 0;
    let hasMore = true;
    // objectCount = await appointment.find(query,).countDocuments();

    // if (starting_after_objectQP) query["$and"].push({"appointmentId": {$gt: starting_after_objectQP}});
    // documents = await appointment.find(query,).sort({appointmentId: 1}).limit(limitQP).lean();
    // lastDocument = await appointment.findOne(query,).sort({appointmentId: -1}).lean();

    // // console.log(lastDocument.appointmentId)
    // documents.forEach((document) => {
    //   if (document.appointmentId.equals(lastDocument.appointmentId)) hasMore = false;
    // });

    documents.forEach((document) => {
      // if (document.appointmentId.equals(lastDocument.appointmentId)) hasMore = false;
      document.patient.patientId = "LCS-1905-13";
      document.patient.fileEntires = Math.floor(Math.random() * 31);
    });

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
      hasMore = false;
    }

    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: documents.length,
        hasMore,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// getting all appointments
const allAppointments = async (req, res) => {
  try {
    // console.log("all appointments")
    const bookedQP = req.query.booked ?? "true";
    const cancelledQP = req.query.cancelled ?? "true";
    const rejectedQP = req.query.rejected ?? "true";
    const completedQP = req.query.completed ?? "true";
    const pendingQP = req.query.pending ?? "true";
    const medicalCenterIdQP = req.query.medicalCenterId;
    const starting_after_objectQP = req.query.starting_after_object;
    let limitQP = Number(req.query.limit) ?? 30;
    const fromDateQP = req.query.fromDate;
    const toDateQP = req.query.toDate;
    const skipQP =  Number(req.query.skip ?? 0);

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    let bookingStatusQP = [];
    if (bookedQP === "true") bookingStatusQP.push("booked");
    if (cancelledQP === "true") bookingStatusQP.push("cancelled");
    if (rejectedQP === "true") bookingStatusQP.push("rejected");
    if (completedQP === "true") bookingStatusQP.push("completed");
    if (pendingQP === "true") bookingStatusQP.push("pending");

    let query = {};
    query["$and"] = [];
    query["$and"].push({ appointmentStatus: { $in: bookingStatusQP } });
    
    // console.log("bookingStatusQP")
    // console.log(bookingStatusQP)

    let objectCount = 0;
    let hasMore = true;

    documents = await appointment.aggregate([
      {
        $lookup: {
          from: `medicalCenters`,
          localField: `medicalCenterId`,
          foreignField: `medicalCenterId`,
          as: `medicalCenterObject`,
        },
      },
      {
        $lookup: {
          from: `doctors`,
          localField: `doctorId`,
          foreignField: `doctorId`,
          as: `doctorObject`,
        },
      },
      {
        $match: {
          $and: query["$and"],
        },
      },
      { $sort: { appointmentId: 1, _id: 1 } },
      { $skip : skipQP },
      { $limit: limitQP },
    ]);

    documents.forEach((document) => {
      document.medicalCenterObject = document.medicalCenterObject[0];
      document.doctorObject = document.doctorObject[0];
      // document.patient.birthDate = document.patient.birthDate
      // .toISOString()
      // .split("T")[0];
      document.patient.age = Math.floor(Math.random() * 91);
      document.patient.patientId = "LCS-1905-13";
      // document.appointmentDate = document.appointmentDate
      //   .toISOString()
      //   .split("T")[0];
      document.price = Number.parseFloat(Math.random() * 150).toFixed(2);
      document.notes =
        "Place holder for notes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";
    });

    let count = documents.length;

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  specificAppointment,
  doctorAppointmentSummaries,
  doctorAppointments,
  allAppointments,
};
