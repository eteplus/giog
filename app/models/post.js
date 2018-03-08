'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING(64)
    },
    title: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.TEXT
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
    github: {
      type: DataTypes.STRING(64)
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.STRING
    },
    publishedAt: {
      field: 'published_at',
      type: DataTypes.STRING
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.STRING
    },
    commentCount: {
      field: 'comment_count',
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING(64)
    }
  }, {
    timestamps: false,
    tableName: 'posts'
  })
  Post.associate = function(models) {
    Post.belongsToMany(models.Tag, {
      as: 'tags',
      through: models.PostTag,
      foreignKey: 'post_id'
    })
    Post.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'post_id',
      constraints: false
    })
  }
  return Post
}
