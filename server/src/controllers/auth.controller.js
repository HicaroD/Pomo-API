import bcrypt from 'bcryptjs';
import authService from '../services/auth.service.js';

const login = async (req, res) => {
    try {
	const { email, password } = req.body;

	const user = await authService.findByEmail(email);
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if(!isPasswordValid || !user) {
	    return res.status(400).send({message: "E-mail or password is not valid"});
	}

	return res.send({message: "Login was made successfully"});
    } catch (error) {
	return res.status(500).send({ message: error.message });
    }
};

export default { login };
