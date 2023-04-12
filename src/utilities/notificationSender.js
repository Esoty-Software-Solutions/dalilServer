const firebaseAdmin  = require("../config/firebase.config");

//to send to a specific device
const singleNotification = async (
  title,
  body,
  registrationToken,
  data
  ) => {
   
  const payload = {
    notification: {
              title: title,
              body: body,
              // clickAction : "" // this is used when we have to click something and it routes us somewhere
            },
    data: data
}
  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  return firebaseAdmin
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
  firebaseAdmin
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
