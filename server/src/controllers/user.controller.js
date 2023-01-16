import userService from '../services/user.service.js';

const create = async (req, res) => {
    const { name, username, email, password, avatar } = req.body;

    if (!name || !username || !email || !password || !avatar) {
	return res.status(400).send({
	    message: "send all required fields for registration",
	});
    }

    const user = await userService.create(req.body);

    if (!user) {
	return res.status(400).send({
	    message: "Unable to create user",
	});
    }

    return res.status(201).send({
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
	return res.status(400).send({
	    message: "Send at least one field for updating the user",
	});
    }

    const id = req.id;

    await userService.update(id, name, username, email, password, avatar);
    return res.send({message: "User updated"});
};

const findAll = async (_, res) => {
    const users = await userService.findAll();

    if(users.length === 0) {
	return res.status(400).send({
	    message: "No users found",
	});
    }

    return res.send(users);
};

const findById = async (req, res) => {
    const user = req.user;
    return res.send(user);
};

const remove = async (req, res) => {
    const id = req.id;

    await userService.removeById(id);

    return res.send({ message: "User deleted successfully" });
};

export default { create, update, findAll, remove, findById };
