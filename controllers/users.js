const User = require('../models/User');
const errorHandler = require('../utils/errorHandlers');
const usersUtils = require('../utils/userUtils');

module.exports.selfUser = async function (request, response) {
    try {
        response.status(200).json(request.user);
    } catch (e) {
        errorHandler(e);
    }
};

module.exports.usersList = async function (request, response) {
  if (request.user.role !== usersUtils.UsersRole.Admin) {
      return response.status(403).json({
         message: "Permission denied",
      })
  } else {
      if (request.body.withDeleted) {
          try {
              const users = await User.find();
              const clientUsers = users.map((user) => {
                  return usersUtils.mapUserToClient(user);
              });
              return response.status(200).json({
                  users: clientUsers,
              })
          } catch (e) {
              errorHandler(e);
          }
      } else {
          try {
              const users = await User.find({ deleted: false });
              const clientUsers = users.map((user) => {
                  return usersUtils.mapUserToClient(user);
              });
              return response.status(200).json({
                  users: clientUsers,
              })
          } catch (e) {
              errorHandler(e);
          }
      }
  }
};

module.exports.update = async function (request, response) {
    if (request.user.role !== usersUtils.UsersRole.Admin) {
        return response.status(403).json({
            message: "Permission denied",
        })
    } else {
        try {
            await User.updateOne(
                {_id: request.params.id},
                {$set: request.body},
            );
            return response.status(200).json('success');
        } catch (error) {
            errorHandler(response, error)
        }
    }
};
