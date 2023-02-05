import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

dotenv.config();

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }
    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }
    const [schema, jwtToken] = parts;

    if (schema !== "Bearer") {
      return res.sendStatus(401);
    }

    jwt.verify(
      jwtToken,
      process.env.JWT_PRIVATE_KEY,
      async (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Invalid token" });
        }

        const user = await userService.findById(decoded.id);

        if (!user) {
          return res.status(401).send({ message: "Invalid token" });
        }
        req.user = user;
        return next();
      }
    );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default { auth };
