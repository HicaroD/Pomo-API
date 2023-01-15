import mongoose from 'mongoose';
import userService from '../services/user.service.js';

const create = async (req, res) => {
    const { name, username, email, password, avatar } = req.body;

    if (!name || !username || !email || !password || !avatar) {
	res.status(400).send({
	    message: "send all required fields for registration",
	});
    }

    const user = await userService.create(req.body);

    if (!user) {
	res.status(400).send({
	    message: "Unable to create user",
	});
    }

    res.status(201).send({
	message: "User created successfully",
	user: {
	    id: user._id,
	    name,
	    username,
	    email,
	    avatar
	}
    });
};

const update = async (req, res) => {
    const { name, username, email, password, avatar } = req.body;

    if (!name && !username && !email && !password && !avatar) {
	res.status(400).send({
	    message: "Send at least one field for updating the user",
	});
    }

    const id = req.params.id;

    if(!(mongoose.Types.ObjectId.isValid(id))) {
	res.status(400).send({
	    message: "Invalid user ID",
	});
    }

    const user = userService.findById(id);

    if(!user) {
	res.status(400).send({
	    message: "User not found",
	});
    }

    await userService.update(id, name, username, email, password, avatar);
    res.send({message: "User updated"});
};

const findAll = async (_, res) => {
    const users = await userService.findAll();

    if(users.length === 0) {
	res.status(400).send({
	    message: "No users found",
	});
    }

    res.send(users);
};

export default { create, update, findAll };
