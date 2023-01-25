import mongoose from "mongoose";
import userService from "../services/user.service.js";

const isValidId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user ID",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const isValidUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findById(id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default { isValidId, isValidUser };
