'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.hasMany(models.Song, {
      foreignKey: 'albumId',
      as: 'songs'
    });
  };
  return Album;
};
