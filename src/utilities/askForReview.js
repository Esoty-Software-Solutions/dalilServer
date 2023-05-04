const AppointmentServices = require("../services/appointmentServices");
const { singleNotification } = require("./notificationSender");

const askForReview = async (appointmentId) => {
  try {
    const appointment = await AppointmentServices.getAppointmentDetails({
      _id: appointmentId,
    });

    if (appointment.appointmentStatus.backendName == "completed") {
      let title = "Please review your Doctor";

      let body = `Hello ${appointment.createdBy.username}, your appointment has been marked as completed. 
          Please provide your valuable review for your doctor ${appointment.schedule.doctor.firstName}. Thanks.`;

      let deviceToken = appointment.createdBy.deviceToken;

      let notification = await singleNotification(title, body, deviceToken);

      if (notification.result) {
        console.log("Notification sent to user");
      } else {
        console.log("Notification not sent");
      }
    }
  } catch {
    (err) => console.log(err);
  }
};

module.exports = { askForReview };
