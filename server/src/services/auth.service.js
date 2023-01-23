import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, { expiresIn: 86400 });

const findByEmail = (email) => User.findOne({ email: email }).select("+password");

export default { findByEmail, generateToken };
