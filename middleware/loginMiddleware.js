// importing users collection
const user = require(`../schemas/userSchema`);
// importing  dependencies
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const login = async (req, res) => {
  try {
    const myPlaintextPassword = req.body.password;

    const doc = await user.findOne({
      username: req.body.username,
    });
    if (!doc) {
      return res.status(404).json({ message: `username is invalid` });
    }
    const hashedPassword = doc.password;
    const userId = doc.userId;
    const role = doc.userRole;
    // comparing hashed password
    const hash = await bcrypt.compare(myPlaintextPassword, hashedPassword);
    if (!hash) {
      return res.status(404).json({ message: `password is invalid` });
    }
    const { username } = req.body;
    const document = await user.findOne({
      password: hashedPassword,
      username: username,
    });
    const token = jwt.sign(
      { userId, username, hashedPassword, role },
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
    const response = await user
      .aggregate([
        {
          $match: {
            username: username,
            password: hashedPassword,
          },
        },
        {
          $lookup: {
            from: `beneficiaries`,
            localField: `beneficiaryId`,
            foreignField: `beneficiaryId`,
            as: `beneficiary`,
          },
        },
        {
          $project: {
            userId: 1,
            username: 1,
            firstName: 1,
            middleName: 1,
            lastName: 1,
            phoneNumber: 1,
            beneficiary: { $first: "$beneficiary" },
            doctorId: 1,
          },
        },
        // { $unwind: "$beneficiary" },
        {
          $project: {
            __v: 0,
            sd: 0,
            _id: 0,
            password: 0,
            "beneficiary._id": 0,
            "beneficiary.__v": 0,
            "beneficiary.sd": 0,
            "beneficiary.familyMembers.medicalFiles": 0,
          },
        },
      ])
      .exec();

    const responseBody = {
      statusCode: "200",
      message: "good",
      token: `Bearer ${token}`,
      data: response[0],
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    console.log("change password");
    const myPlaintextCurrentPassword = req.body.currentPassword;
    const myPlaintextNewPassword = req.body.newPassword;
    // hashing user password
    const newHash = bcrypt.hashSync(myPlaintextNewPassword, 10);

    const doc = await user.findOne({
      userId: req.params.userId,
    });
    if (!doc) {
      return res.status(404).json({ message: `userId is invalid` });
    }
    const hashedPassword = doc.password;
    // comparing hashed password
    const hash = await bcrypt.compare(myPlaintextCurrentPassword, hashedPassword);
    if (!hash) {
      return res.status(404).json({ message: `password is invalid` });
    }

    const newbody = {
      password: newHash,
    };
    const document = await user.findOneAndUpdate(
      {
        userId: req.params.userId,
      },
      newbody
    );

    const responseBody = {
      statusCode: "201",
      message: "password updated",
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    console.log(
      "Create Medical Center -----------------------------------------------"
    );
    // console.log(req.headers)
    console.log("req.body");
    console.log(req.body);

    console.log("req.body");
    console.log(req.body);

    console.log(
      "Create Medical Center response ---------------------------------------------------"
    );
    const responseBody = {
      codeStatus: "200",
      message: "logout successful",
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  logout,
  changePassword
};
