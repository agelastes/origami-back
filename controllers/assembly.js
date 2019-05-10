const Assembly = require('../models/Assembly');
const usersUtils = require('../utils/userUtils');
const errorHandler = require('../utils/errorHandlers');
const assemblyUtils = require('../utils/assemblyUtils');

module.exports.create = async function (request, response) {
    if (!request.body.name) {
        return response.status(400).json('Bad request');
    }
    if (request.user.role !== usersUtils.UsersRole.Admin) {
        return response.status(403).json('Permission denied');
    }
    const newAssembly = new Assembly({
        name: request.body.name,
    });
    try {
        const assembly = await newAssembly.save();
        const clientAssemble = assemblyUtils.mapAssemblyToClient(assembly);

        return response.status(201).json(clientAssemble);
    } catch (e) {
        errorHandler(e);
    }
};

module.exports.update = async function (request, response) {
    if (!request.body.name || !request.params.id) {
        return response.status(400).json('Bad request');
    }
    if (request.user.role !== usersUtils.UsersRole.Admin) {
        return response.status(403).json('Permission denied');
    }
    try {
        await Assembly.updateOne(
            { _id: request.params.id },
            { $set: request.body }
        );
        return response.status(200).json('Success');
    } catch (e) {
        errorHandler(e);
    }
};