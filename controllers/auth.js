const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandlers');
const usersUtils = require('../utils/userUtils');

module.exports.login = async function (request, response) {
    const candidate = await User.findOne({ login: request.body.login });

    if(candidate) {
        if (candidate.deleted) {
            response.status(410).json({
                message: "User deleted",
            })
        }

        const passwordResult = bcrypt.compareSync(request.body.password, candidate.password);

        if (passwordResult) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id,
            }, keys.jwt, { expiresIn: 3600 });

            response.status(200).json({
                token: `Bearer ${token}`,
                role: candidate.role,
                id: candidate._id
            });
        } else {
            response.status(401).json({
                message: "",
            })
        }
    } else {
        response.status(404).json({
            messeage: "Not found",
        });
    }
};

module.exports.register = async function (request, response) {
    const candidate = await User.findOne({ $or: [
        { login: request.body.login },
        { email: request.body.email }
        ]
    });

    if (candidate) {
        response.status(409).json({
            message: "Такой email уже занят, попробуйте другой",
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = request.body.password;

        const user = new User({
            login: request.body.login,
            email: request.body.email,
            password: bcrypt.hashSync(password, salt),
        });

        try {
            await user.save();
            const clientUser = usersUtils.mapUserToClient(user);
            response.status(201).json(clientUser)
        } catch (error) {
            errorHandler(response, error);
        }
    }
};
