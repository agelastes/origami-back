module.exports.mapUserToClient = function(user) {
    return {
        id: user._id,
        login: user.login,
        deleted: user.deleted,
        role: user.role,
        email: user.email,
    }
};

module.exports.UsersRole = {
    Guest: 1,
    User: 2,
    Admin: 3,
};
