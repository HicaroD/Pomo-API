import express from 'express';
import userRouter from './src/routes/user.route.js';

const PORT = 3000;
const app = express();

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
