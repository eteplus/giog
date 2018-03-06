'use strict'

module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    tagId: {
      allowNull: false,
      type: DataTypes.STRING(64),
      field: 'tag_id',
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    postId: {
      allowNull: false,
      type: DataTypes.STRING(64),
      field: 'post_id',
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'post_tag'
  })
  return PostTag
}
