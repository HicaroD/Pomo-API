const create = (req, res) => {
    const { name, username, email, password, avatar } = req.body;

    if(!name || !username || !email || !password || !avatar) {
	res.status(400).send({
	    message: "Send all required fields for registration",
	});
    }

    res.json(req.body);
};

export default create;
