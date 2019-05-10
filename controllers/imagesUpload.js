module.exports.upload = async function (request, response) {
    response.status(200).json({
        url: request.file ? request.file.path : ''
    })
};