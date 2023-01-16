import dotenv from 'dotenv';
import express from 'express';

import connectDatabase from './src/database/database.js';

import authRouter from './src/routes/auth.route.js';
import swaggerRoute from './src/routes/swagger.route.cjs';
import userRouter from './src/routes/user.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDatabase();

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerRoute);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
