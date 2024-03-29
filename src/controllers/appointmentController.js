const AppointmentServices = require("../services/appointmentServices");
const SubscriberServices = require("../services/subscriberServices");
const checkFeilds = require("../utilities/checkFields");
const SmsServices = require("../services/smsServices");
const { subscribers, beneficiaries } = require("../schemas/subscriberSchema");
const {searchQuery,getSearchQuery} = require("../utilities/searchQuery");
const {
  singleNotification
} = require("../utilities/notificationSender");

const dateRegex = /^([0-9]{4})-(?:[0-9]{2})-([0-9]{2})$/;
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
  notFoundResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");
const schedule = require("../schemas/scheduleSchema");
const appointment = require("../schemas/appointmentSchema");

const createMessage = async (
  doctor,
  medicalCenterName,
  appointmentDate,
  appointmentStatus,
  phone
) => {
  let message_body = `Your appointment for ${doctor} at ${medicalCenterName} on ${appointmentDate} is ${appointmentStatus}`;
  const sms = await SmsServices.createSms({
    phone: phone,
    message: message_body,
  });
  return sms;
};

const createAppointment = async (req, res) => {
  try {
    const {
      beneficiaryId,
      scheduleId,
      appointmentDate,
      appointmentStatusId,
      timeSlotId,
    } = req.body;
    if (!dateRegex.test(appointmentDate)) {
      return badRequestErrorResponse(res, "Invalid date format");
    }
    const isError = checkFeilds(
      {
        beneficiaryId,
        scheduleId,
        appointmentDate,
        appointmentStatusId,
        timeSlotId,
      },
      res
    );

    if (isError) return;
      // adding user id to the body payload
      if(req?.userId) {
        req.body.createdBy = req.userId;
      }
    const document = await AppointmentServices.createAppointment({
      ...req.body,
    });

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const updateAppointment = async (req, res) => {
  try {
    if(req?.userId) {
      req.body.createdBy = req.userId;
    }
    let checkAppointmentSatatus=await appointment.findById(req.params.appointmentId);
    const document = await AppointmentServices.updateAppointment(
      {
        _id: req.params.appointmentId,
      },
      {
        ...req.body
      }
    );
   
   
   
      if(req.body.appointmentStatus && checkAppointmentSatatus.appointmentStatus._id.toString() !=req.body.appointmentStatus.toString() )
      {
       
        // singleNotification
        let doctorName=document.schedule.doctor.firstName+" "+document.schedule.doctor.secondName+" "+document.schedule.doctor.lastName;
        let medicalCenter=document.schedule.medicalCenter.name;
        let appointmentStatus=document.appointmentStatus.englishName;
        let message="Your appointment with "+doctorName+" at "+medicalCenter+" has been "+appointmentStatus;
        let deviceToken=document?.createdBy?.deviceToken;
       
        if(deviceToken)
        {
          const {result, response} = await singleNotification("Appointment Status Updated", message, deviceToken, '');
          console.log(result,response)
        }
      
      }

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const getAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.getAppointmentDetails({
      _id: req.params.appointmentId,
    });

    if (!document) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }

    return successResponse(res, messageUtil.success, document);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

const getAppointments = async (req, res) => {
  try {
    let limitQP = Number(req.query.limit) ?? 30;
    let query = {};

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    if (req.query.medicalCenterId ) {
      // console.log("chetan",req.query.medicalCenterId)
      let scheduleList=await schedule.find({medicalCenter:req.query.medicalCenterId});
      let scheduleIds=[];
      for (const iterator of scheduleList) {
        scheduleIds.push(iterator._id.toString());
      }    
      query.schedule={$in:scheduleIds};
    }
    if (req.query.doctorId) {
      query.doctorId = req.query.doctorId;
    }

       if (req.query.appointmentStatusId) {
      // let arr = JSON.parse(req.query.appointmentStatusId);
      query.appointmentStatus = {
        $in: req.query.appointmentStatusId,
      };
    }
    if (req.query.dateRange) {
      // dateRange: [ '2022-12-22', '2023-03-01' ]
      // let arr = JSON.parse(req.query.dateRange);
      let arr = req.query.dateRange;
      const startDate = new Date(arr[0]);
      const endDate = new Date(arr[1]);
      query.appointmentDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    if (req.query.fromDate) {
      // dateRange: [ '2022-12-22', '2023-03-01' ]
      // let arr = JSON.parse(req.query.dateRange);
      let fromDate = req.query.fromDate;
      const startDate = new Date(fromDate);
     
      query.appointmentDate = {
        $gte: startDate,
      
      };
    }
    if (req.query.toDate) {
      // dateRange: [ '2022-12-22', '2023-03-01' ]
      // let arr = JSON.parse(req.query.dateRange);
      let toDate = req.query.toDate;
      const endDate = new Date(toDate);
    
      query.appointmentDate = {
        $lte: endDate,
      
      };
    }
    if(req.query.searchQuery)
    {
      const searchFields = ["firstName", "secondName","lastName"];
      let searchquery = getSearchQuery(searchFields, req.query.searchQuery);
      
      let beneficiary=await beneficiaries.find(searchquery);
      let beneficiaryIds=[];
      for (const iterator of beneficiary) {
        beneficiaryIds.push(iterator._id.toString());
      }

     

      query.$or=[{beneficiary:{$in:beneficiaryIds}}];
    }
    let sort={appointmentDate:-1};
    if(req.query.sort=="ascending")
    {
      sort={appointmentDate:1};
    }
    
    console.log("query: ", query);
    let documents = await AppointmentServices.getAppointments(query, limitQP,sort);
    let count = documents.length;

    const data = {
      objectCount: count,
      objectArray: documents,
    };

    return successResponse(res, messageUtil.success, data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    let subscriber = await SubscriberServices.getSubscriber({
      _id: req.params.subscriberId,
    });

    if (!subscriber) {
      return notFoundResponse(res, messageUtil.resourceNotFound);
    }
    let beneficiaryIds;
    if(subscriber?.beneficiaries) {
      beneficiaryIds = subscriber.beneficiaries.map(benefObject => benefObject._id.toString());
    }
    let query = { beneficiary: { $in: beneficiaryIds } };
    if (req.query.appointmentStatus) {
      let arr = JSON.parse(req.query.appointmentStatus);
      query.appointmentStatus = {
        $in: arr,
      };
    }
    if (req.query.dateRange) {
      let arr = JSON.parse(req.query.dateRange);
      const startDate = new Date(arr[0]);
      const endDate = new Date(arr[1]);
      query.appointmentDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    
    let documents = await AppointmentServices.getAppointments(query);
    let count = documents.length;


    const data = {
      objectCount: count,
      objectArray: documents,
    };

    return successResponse(res, messageUtil.success, data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
  getUserAppointments,
};
