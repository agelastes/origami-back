const Origami = require('../models/Origami');
const Comment = require('../models/Comment');
const errorHandler = require('../utils/errorHandlers');
const usersUtils = require('../utils/userUtils');
const commentUtils = require('../utils/commentUtils');

module.exports.create = async function (request, response) {
        try {
            const origami = await Origami.findOne({ _id: request.body.origamiId });
            if (!origami) {
                return response.status(404).json("Not Found");
            } else {
                const date = new Date().getTime();
                const newComment = new Comment({
                    text: request.body.text,
                    date,
                    origamiId: origami._id,
                    author: request.body.login
                });
                try {
                    const comment = await newComment.save();

                    response.status(201).json(commentUtils.mapCommentToClient(comment));
                } catch (e) {
                    errorHandler(e)
                }
            }
        } catch (e) {
            errorHandler(e)
        }
};

module.exports.delete = async function (request, response) {
    if (!request.params.id) {
        return response.status(400).json('Bad Request');
    }

    if (request.user.role !== usersUtils.UsersRole.Admin) {
        return response.status(403).json('Permission denied');
    }

    try {
        await Comment.deleteOne({ _id: request.params.id });
        return response.status(200).json('Success');
    } catch (e) {
        errorHandler(e);
    }
};