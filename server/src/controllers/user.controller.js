import mongoose from 'mongoose';
import userService from '../services/user.service.js';

const create = async (req, res) => {
    const { name, username, email, password, avatar } = req.body;

    if (!name || !username || !email || !password || !avatar) {
	res.status(400).send({
	    message: "send all required fields for registration",
	});
	return;
    }

    const user = await userService.create(req.body);

    if (!user) {
	res.status(400).send({
	    message: "Unable to create user",
	});
	return;
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
	return;
    }

    const id = req.params.id;

    if(!(mongoose.Types.ObjectId.isValid(id))) {
	res.status(400).send({
	    message: "Invalid user ID",
	});
	return;
    }

    const user = await userService.findById(id);

    if(!user) {
	res.status(400).send({
	    message: "User not found",
	});
	return;
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
	return;
    }

    res.send(users);
};

const remove = async (req, res) => {
    const id = req.params.id;

    if(!(mongoose.Types.ObjectId.isValid(id))) {
	res.status(400).send({
	    message: "Invalid user ID",
	});
	return;
    }

    const user = await userService.findById(id);

    if(!user) {
	res.status(400).send({
	    message: "User does not exist",
	});
	return;
    }

    await userService.removeById(id);

    res.send({ message: "User deleted successfully" });
};

export default { create, update, findAll, remove };
