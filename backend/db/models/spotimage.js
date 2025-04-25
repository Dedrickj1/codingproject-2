'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotImage = sequelize.define('SpotImage', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'URL must be valid',
        },
      },
    },
    preview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Define associations
  SpotImage.associate = function (models) {
    SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };

  return SpotImage;
};
