import userService from '../services/user.service.js';

const create = async (req, res) => {
	const { name, username, email, password, avatar } = req.body;

	if (!name || !username || !email || !password || !avatar) {
		res.status(400).send({
			message: "Send all required fields for registration",
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

export default create;
