'use strict'

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
    timestamps: false,
    tableName: 'tags',
  })
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Post, {
      as: 'posts',
      through: models.PostTag,
      foreignKey: 'tag_id'
    })
  }
  return Tag
}
