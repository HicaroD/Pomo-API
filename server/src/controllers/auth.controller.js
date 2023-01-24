import bcrypt from "bcryptjs";
import authService from "../services/auth.service.js";

const login = async (req, res) => {
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

export default { login };
