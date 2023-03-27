// importing users collection
const user = require(`../schemas/userSchema`);
const beneficiaries = require(`../schemas/beneficiarySchema`);
// importing  dependencies
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const mongoose = require(`mongoose`);

// api for creating new user

const passwordReset = async (req, res) => {
  try {
    // server response
    res.status(201).json({
      statusCode: "201",
      message: "password reset successful"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ statusCode: "500", message: error.message });
  }
};

const createUsers = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password ?? "123";

    // hashing user password
    const hash = bcrypt.hashSync(myPlaintextPassword, 10);
    const newBody = {
      ...req.body,
      password: hash,
      userId: new mongoose.Types.ObjectId().toString(),
    };
    const document = await user.create(newBody);
    const { userId, username, password } = document._doc;

    const update = { 
      userId: req.body.userId,
      account: {
        hasAccount: true,
        userId: req.body.userId
      }
    };
    const document_ = await beneficiaries
      .findOneAndUpdate(
        { beneficiaryId: req.body.beneficiaryId },
        update,
      )
      .lean();

    // siginig/authenticating user with jwt token for authorization
    const token = jwt.sign(
      { userId, username, password },
      process.env.jwtSecret,
      {
        expiresIn: `30d`,
      }
    );
    res.cookie("access_token", `Bearer ${token}`, {
      expires: new Date(Date.now() + 720 * 3600000),
      httpOnly: true,
      path: `/`,
    });
    delete document._doc.password;
    delete document._doc.sd;
    // server response
    res.status(200).json({
      ...document._doc,
      statusCode: "200",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ statusCode: "500", message: error.message });
  }
};

// api for getting all users
const getUsers = async (req, res) => {
  try {
    let userIdQuery = req.query.starting_after_object;
    let limitQuery = req.query.limit;
    const skipQP = Number(req.query.skip ?? 0);

    if (!userIdQuery) {
      userIdQuery = `SSD-0`;
    }

    if (!limitQuery) {
      limitQuery = 5;
    }

    let limit = Number(limitQuery);
    if (!userIdQuery.startsWith(`SSD-`)) {
      return res.status(404).json({
        statusCode: "404",
        message: `User not found, check your starting_after_object input`,
      });
    }

    const idNumber = Number(userIdQuery.split(`-`)[1]);
    if (limit > 100 || limit < 1) {
      limit = 30;
    }
    const totalUsers = await user.find({
      sd: { $gt: idNumber },
    });

    const documents = await user
      .find()
      .skip(skipQP)
      .limit(!limit ? 30 : limit);

    const count = await user.find().count();

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
    console.log(error.message);
    res.status(500).json({ statusCode: "500", message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const document = await user.findOne(req.params).lean();

    if (!document) {
      return res
        .status(404)
        .json({ statusCode: "404", message: `user not found` });
    }

    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: document,
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ statusCode: "500", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.files[0].location) {
      return res.status(401).json({ error: "Please upload a picture" });
    }
    const users = await user.findOneAndUpdate(
      { _id: req.params.id },
      { userFile: req.files[0].location },
      { new: true }
    );
    if (!users) {
      return res
        .status(404)
        .json({ statusCode: "404", error: "No user found" });
    }
    res.status(200).json({
      statusCode: "200",
      users,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ statusCode: "404", message: error.message });
  }
};

module.exports = { createUsers, getUser, getUsers, updateUser };
