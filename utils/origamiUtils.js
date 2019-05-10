module.exports.mapOrigamiToClient = (origami) => {
  return {
      id: origami._id,
      title: origami.title,
      mainImage: origami.mainImage,
      images: origami.images,
      userId: origami.userId,
      deleted: origami.deleted,
      date: origami.date,
  }
};
