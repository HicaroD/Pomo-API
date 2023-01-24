import moongose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
moongose.set("strictQuery", false);
const MONGODB_URL = process.env.MONGODB_URL;

const connectDatabase = () => {
  moongose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB database"))
    .catch((err) => console.log(err));
};

export default connectDatabase;
