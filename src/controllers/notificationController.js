const {
  singleNotification,
  multipleNotification,
} = require("../utilities/notificationSender");

class Notification {
  SendNotificationOnSingleDevice = async (req, res) => {
    const notificationData = req.body;
    console.log(notificationData);
    try {
      const { result, response } = await singleNotification(
        notificationData.payload.title,
        notificationData.payload.body,
        notificationData.deviceToken,
        notificationData.payload,
      );
      if (!result) {
        return res.status(400).json({
          message: "Notification failed.",
          response,
        });
      }
      return res.status(200).json({
        message: "Notification sent.",
        response,
      });
    } catch (err) {
      console.log("error in the main api function ", err);
      res.status(500).json({ message: err.message });
    }
  };

  SendNotificationToMultipleDevices = async (req, res) => {
    // need to pass an array of device tokens
    try {
      const { tokens } = req.body;

      multipleNotification(tokens);

      return res.status(200).json({
        message: "Notifications sended successfully.",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
module.exports = new Notification();
