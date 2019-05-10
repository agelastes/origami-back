module.exports.mapAssemblyToClient = (assembly) => {
    return {
        id: assembly._id,
        name: assembly.name,
    }
};
