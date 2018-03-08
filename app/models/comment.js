'use strict'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING(64)
    },
    postId: {
      allowNull: false,
      type: DataTypes.STRING(64),
      field: 'post_id',
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT
    },
    author: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    association: {
      type: DataTypes.STRING(32)
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.STRING
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.STRING
    },
    cursor: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    tableName: 'comments'
  })
  return Comment
}
