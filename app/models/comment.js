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
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
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
