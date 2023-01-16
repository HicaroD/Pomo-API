import mongoose from 'mongoose';
import userService from '../services/user.service.js';

const isValidId = (req, res, next) => {
    const id = req.params.id;

    if(!(mongoose.Types.ObjectId.isValid(id))) {
	return res.status(400).send({
	    message: "Invalid user ID",
	});
    }
    next();
};

const isValidUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findById(id);

    if(!user) {
	return res.status(400).send({
	    message: "User not found",
	});
    }
    next();
};

export default { isValidId, isValidUser };
