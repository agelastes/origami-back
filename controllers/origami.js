const Origami = require('../models/Origami');
const Comment = require('../models/Comment');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandlers');
const usersUtils = require('../utils/userUtils');
const commentsUtils = require('../utils/commentUtils');
const origamiUtils = require('../utils/origamiUtils');

module.exports.create = async function (request, response) {
    if (request.user.role === usersUtils.UsersRole.Guest) {
        return response.status(403).json({
            message: "Permission denied",
        })
    } else {
        const newOrigami = new Origami({
            title: request.body.title,
            mainImage: request.body.mainImage,
            description: request.body.description,
            userId: request.user.id,
            images: request.body.images ? request.body.images : undefined,
            author: request.body.author,
            category: request.body.category
        });
        try {
            const origami = await newOrigami.save();
            const clientOrigami = origamiUtils.mapOrigamiToClient(origami);
            return response.status(201).json(clientOrigami);
        } catch (e) {
            errorHandler(e);
        }
    }
};

module.exports.update = async function (request, response) {
    if (request.user.role === usersUtils.UsersRole.Guest) {
        return response.status(403).json({
            message: "Permission denied",
        })
    }
    const oldOrigami = await Origami.findOne({ _id: request.params.id });

    if (
        request.user.role === usersUtils.UsersRole.User &&
        oldOrigami.userId.toString() !== request.user.id.toString()
    ) {
        return response.status(403).json({
            message: "Permission denied",
        })
    }
    try {
        await Origami.updateOne(
            { _id: request.params.id },
            { $set: request.body }
        );
        return response.status(200).json('Success');
    } catch (e) {
        errorHandler(e);
    }
};

// разобраться с датами
module.exports.list = async function (request, response) {
    const { start, end, offset, limit } = request.query;
    const query = {};

    if (start) {
        query.date = {
            $gte: start
        }
    }

    if (end) {
        if (!query.date) {
            query.date = {};
        }

        query.date['$lte'] = end;
    }

    try {
        const orders = await Origami
            .find(query)
            .sort({ date: -1 })
            .skip(+offset)
            .limit(+limit);

        response.status(200).json(orders);
    } catch (error) {
        errorHandler(response, error);
    }
};

module.exports.origamiInfo = async function (request, response) {
    if (!request.body.id) {
        return response.status(400).json('Bad request');
    }
    const origami = await Origami.findOne({ _id: request.body.id });
    const clientOrigami = origamiUtils.mapOrigamiToClient(origami);

    if (request.body.withDetail) {
        const comments = await Comment.find({ origamiId: clientOrigami.id });
        let origamiComments = [];

        if (comments.length) {
            for (const comment of comments) {
                origamiComments.push({
                    ...commentsUtils.mapCommentToClient(comment),
                });
            }
        }

        return response.status(200).json({...clientOrigami, comments: origamiComments});
    } else {
        return response.status(200).json(clientOrigami);
    }
};