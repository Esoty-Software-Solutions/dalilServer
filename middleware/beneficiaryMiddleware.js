const beneficiaries = require(`../schemas/beneficiarySchema`);
// importing all dependencies
const user = require(`../schemas/userSchema`);
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const mongoose = require("mongoose");

// api for creating Beneficiary
const createBeneficiary = async (req, res) => {
  try {
    const newBody = {
      ...req.body,
      beneficiaryId: new mongoose.Types.ObjectId().toString(),
    };
    const document = await beneficiaries.create(newBody);

    const responseBody = {
      codeStatus: "201",
      message: "document created",
      data: document,
    };
    res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting all user Beneficiaries
const getBeneficiaries = async (req, res) => {
  try {
    const limitQuery = req.query.limit;
    const skipQP = Number(req.query.skip ?? 0);
    let beneficiaryIdQuery = req.query.starting_after_object;
    const institutionId = req.query.institutionId;

    const limit = Number(limitQuery);
    if (!beneficiaryIdQuery) {
      beneficiaryIdQuery = `SSD-0`;
    }
    // if (!beneficiaryIdQuery.startsWith(`SSD-`)) {
    //   return res.status(404).json({
    //     message: `beneficiary not found, check your starting_after_object input`,
    //   });
    // }

    let beneficiaryId = Number(beneficiaryIdQuery.split(`-`)[1]);
    const institution = institutionId;

    if (limit > 100 || limit < 1) {
      limit = 30;
    }

    if (!institution) {
      const documents = await beneficiaries
        .find()
        .skip(skipQP)
        .limit(!limit ? 30 : limit);

      const count = await beneficiaries.find().count();
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
    }

    // checking for isurancePolicy Query
    if (institution) {
      const documents = await beneficiary
        .find({
          institutionId: institution,
        })
        .skip(skipQP)
        .limit(!limit ? 30 : limit);

      const count = await beneficiaries
        .find({
          institutionId: institution,
        })
        .count();
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting a single Beneficiary
const singleBeneficiary = async (req, res) => {
  try {
    const document = await beneficiaries.findOne(req.params).lean();

    if (!document) {
      return res
        .status(404)
        .json({ statusCode: "404", message: `beneficiary not found` });
    }

    // if (res.locals.user.userId !== document.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized for this user` });
    // }

    document.birthdate = document.birthdate.toISOString().split("T")[0];

    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: document,
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for updating a single Beneficiary
const updateBeneficiary = async (req, res) => {
  try {
    const doc = await beneficiaries.findOne(req.params).lean();
    if (!doc) {
      return res
        .status(404)
        .json({ message: `beneficiary to update not found` });
    }
    // if (res.locals.user.userId !== doc.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized` });
    // }
    const document = await beneficiaries
      .findOneAndUpdate(
        { beneficiaryId: req.params.beneficiaryId, userId: doc.userId },
        req.body,
        { new: true }
      )
      .lean();

    const documentArray = [document];
    documentArray.forEach((each) => {
      delete each.sd;
    });

    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  singleBeneficiary,
  updateBeneficiary,
};
