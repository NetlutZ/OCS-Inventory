module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        name: {
            type: DataTypes.STRING,
        },

    });

    return Images;
}