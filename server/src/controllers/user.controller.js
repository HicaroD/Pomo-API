import userService from "../services/user.service.js";

const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.send({
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    if (!name && !username && !email && !password && !avatar) {
      return res.status(400).send({
        message: "Send at least one field for updating the user",
      });
    }

    const id = req.user._id;
    await userService.update(id, name, username, email, password, avatar);
    return res.send({ message: "User updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findAll = async (_, res) => {
  try {
    const users = await userService.findAll();

    if (users.length === 0) {
      return res.status(404).send({
        message: "No users found",
      });
    }

    return res.send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.user._id;
    await userService.removeById(id);
    return res.send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default { getUser, update, findAll, remove };
