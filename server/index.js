import express from 'express';
import userRouter from './src/routes/user.route.js';
import connectDatabase from './src/database/database.js'

const PORT = 3000;

connectDatabase();

const app = express();
app.use(express.json());

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
