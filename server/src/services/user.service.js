import User from '../models/User.js';

const findAll = () => User.find();

const create = (body) => User.create(body);

const findById = (id) => User.findById(id);

const update = (
    id,
    name,
    username,
    email,
    password,
    avatar
) => User.findOneAndUpdate(
    {_id: id},
    {name, username, email, password, avatar}
);

export default {create, update, findById, findAll};
