import bcrypt from "bcryptjs";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);
    if (!user) {
      return res
        .status(400)
        .send({ message: "E-mail or password is not valid" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = authService.generateToken(user.id);

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ message: "E-mail or password is not valid" });
    }

    return res.send({ message: "Login was made successfully", token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).send({
        message: "send all required fields for registration",
      });
    }

    const newUser = await userService.create(req.body);

    if (!newUser) {
      return res.status(400).send({
        message: "Unable to create user",
      });
    }

    return res.status(201).send({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name,
        username,
        email,
        avatar,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default { signIn, signUp };
