const {
  singleNotification,
  multipleNotification,
} = require("../utilities/notificationSender");

class Notification {
  SendNotificationOnSingleDevice = async (req, res) => {
    // const getUser = await UserServices.getUser({
    //   _id: req.userId,
    // });

    //token is hardcoded for now. Will get the token from user data
    // The credential used to authenticate this SDK does not have permission to send messages to the device corresponding to the provided registration token. Make sure the credential and registration token both belong to the same Firebase project
    let TOKEN = `enT-54FkaooxgX61IJteLZ:APA91bFCmJBEN4t0l18IxSEOA1b1iL0e1a3R2EbdNIStNSZlBKz0Bn8YeQAhW9xEVb3VJ0fWROrCoXPGUTFhMfAL_bAh1V6eTq0BM_B7CftWY9ksgWUQInr55AUyxUu472JZTBXi5GfM`;
    // TOKEN = getUser.Token

    let TITLE = `YOUR TITLE HERE`;
    let BODY = `YOUR BODY HERE`;
    let TYPE = `booking-status-update`;
    let BOOKING_ID = `booking_id`;
    try {
      console.log("notification api is called");
      let test = await singleNotification(TITLE, BODY, TOKEN, TYPE, BOOKING_ID);
      console.log("TEST ", test);
      if (!test.successCount >= 1) {
        return res.status(400).json({
          message: "Notification failed.",
        });
      }
      return res.status(200).json({
        message: "Notification sent.",
      });
    } catch (err) {
      console.log("error in the main api function " , err);
      res.status(500).json({ message: err.message });
    }
  };

  SendNotificationToMultipleDevices = async (req, res) => {
    //need to pass an array of device tokens
    try {
      let { tokens } = req.body;

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
