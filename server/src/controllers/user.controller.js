import userService from '../services/user.service.js';

const create = async (req, res) => {
	try {
		const { name, username, email, password, avatar } = req.body;

		if (!name || !username || !email || !password || !avatar) {
			return res.status(400).send({
				message: "send all required fields for registration",
			});
		}

		// FIXME(hícaro): two query on database for checking these two things. Is that necessary?
		let user = await userService.findByUsername(username);
		if (user) {
			return res.status(400).send({
				message: "Username already in use",
			});
		}

		user = await userService.findByEmail(email);
		if (user) {
			return res.status(400).send({
				message: "E-mail already in use",
			});
		}

		const newUser = await userService.create(req.body);

		if (!newUser) {
			return res.status(400).send({
				message: "Unable to create user",
			});
		}

		return res.status(201).send({
			message: "User created successfully",
			user: {
				id: newUser._id,
				name,
				username,
				email,
				avatar
			}
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

const update = async (req, res) => {
	try {
		const { name, username, email, password, avatar } = req.body;

		if (!name && !username && !email && !password && !avatar) {
			return res.status(400).send({
				message: "Send at least one field for updating the user",
			});
		}

		const id = req.id;
		await userService.update(id, name, username, email, password, avatar);
		return res.send({ message: "User updated" });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

const findAll = async (_, res) => {
	try {
		const users = await userService.findAll();

		if (users.length === 0) {
			return res.status(404).send({
				message: "No users found",
			});
		}

		return res.send(users);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

const findById = async (req, res) => {
	try {
		const user = req.user;
		return res.send(user);
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const id = req.id;
		await userService.removeById(id);
		return res.send({ message: "User deleted successfully" });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

export default { create, update, findAll, remove, findById };
