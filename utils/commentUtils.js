module.exports.mapCommentToClient = (comment) => {
    return {
        id: comment._id,
        text: comment.text,
        origamiId: comment.origamiId,
        date: comment.date,
        userId: comment.userId,
        author: comment.author
    }
};
