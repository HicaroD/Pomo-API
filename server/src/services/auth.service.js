import User from '../models/User.js';

const findByEmail = (email) => User.findOne({ email: email }).select("+password");

export default { findByEmail };
