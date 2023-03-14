var admin = require("firebase-admin");

var serviceAccount = require("../../esoty-test-firebase-adminsdk-s6ee9-f65f1a4f9f.json");
// var serviceAccount = require("../../test-notification-36f92-firebase-adminsdk-6ogfl-98da7f585e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//to send to a specific device
const singleNotification = async (
  title,
  body,
  registrationToken,
  type,
  booking_id
) => {
  var payload = {
    data: {
      body,
      title,
      type,
      booking_id,
    },
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  return admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      console.log("Successfully sent message: ", response);
      return response;
    })
    .catch(function (error) {
      console.log("error in sending", error);
      return error;
    });
};
// to send notification to group of devices

const multipleNotification = async (tokens) => {
  var payload = {
    data: {
      body: "Hello",
      title: "Notification from sapdasoft",
    },
    tokens,
  };

  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  admin
    .messaging()
    .sendMulticast(payload)
    .then(function (response) {
      //we needs to check the status
      console.log("Successfully sent message: ", response);
    })
    .catch(function (error) {
      console.log("error in sending", error);
    });
};

module.exports = { singleNotification, multipleNotification };
