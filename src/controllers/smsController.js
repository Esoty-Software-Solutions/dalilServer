const { createOne, updateOne, getMany } = require("../services/commonServices");
const SmsServices = require("../services/smsServices");
const SmsSchema = require("../schemas/smsSchema");

const CreateSms = async (req, res) => {
  try {
    // const document = await SmsServices.createSms({
    //   ...req.body,
    // });
    const document = await createOne({
      schemaName : SmsSchema,
      body : {...req.body}
    })
    const responseBody = {
      codeStatus: "201",
      message: "Sms created",
      data: document,
    };
    return res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const UpdateSms = async (req, res) => {
  try {
    const document = await updateOne({
      schemaName : SmsSchema,
      body : {...req.body},
      query : {_id: req.params.id}
    })
    // const document = await SmsServices.updateSms(
    //   { _id: req.params.id },
    //   {
    //     ...req.body,
    //   }
    // );
    if (!document) {
      return res.status(404).json({ message: `sms not found` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AllSms = async (req, res) => {
  try {
    let documents = await getMany({
      schemaName : SmsSchema,
      query : {status: "pending"}
    });
    // let documents = await SmsServices.getAllSms({ status: "pending" });

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty ";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: documents,
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateSms,
  UpdateSms,
  AllSms,
};
