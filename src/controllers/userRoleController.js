const UserRoleServices = require("../services/userRoleServices");

const CreateUserRole = async (req, res) => {
  try {
    const document = await UserRoleServices.createUserRole({
      ...req.body,
      createdBy: req.userId,
      updatedBy: req.userId,
    });

    // server response
    res.status(200).json({ ...document._doc, message: "Role created!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const GetAllRoles = async (req, res) => {
  try {
    const roles = await UserRoleServices.getAllUserRoles({});

    res.status(200).json({
      roles,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.files[0].location) {
      return res.status(401).json({ error: "Please upload a picture" });
    }
    const users = await UserRoleServices.updateUser(
      { _id: req.params.id },
      { userFile: req.files[0].location },
      { new: true }
    );
    if (!users) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({
      users,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { CreateUserRole, GetAllRoles, updateUser };
