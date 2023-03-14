const response = {
  statusCode: 200,
  message: "good",
  data: [],
};

const mongoose = require("mongoose");
const sms = require(`../schemas/smsSchema`);

const createSMS = async (req, res) => {
  try {
    const document = await sms.create({
      ...req.body,
      smsId: new mongoose.Types.ObjectId().toString()
    });
    response.data = document;
    
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateSMS = async (req, res) => {
  try {
    let document = await sms
      .findOneAndUpdate(
        req.params,
        {
          ...req.body
        }
      )
      .lean();
    if (!document) {
      return res.status(404).json({ message: `sms not found` });
    }
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getSMS = async (req, res) => {
  try {
    const document = await sms.findOne(req.params).lean();
    if (!document) {
      return res.status(404).json({ message: `sms not found` });
    }
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getSMSs = async (req, res) => {
  try {
    const objectArray = await sms
      .find({
        messageStatus: { $eq: "pending" },
      })
      .lean();
    const objectCount = objectArray.length
    document = {
      objectCount,
      objectArray
    }
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getSMSs,createSMS, updateSMS,getSMS };