'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(64)
      },
      title: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      author: {
        type: Sequelize.STRING(64)
      },
      avatar: {
        type: Sequelize.STRING
      },
      github: {
        type: Sequelize.STRING(64)
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      publishedAt: {
        field: 'published_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      },
      commentCount: {
        field: 'comment_count',
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING(64)
      }
    }).then(() => {
      return queryInterface.createTable('tags', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(64)
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        }
      }).then(() => {
        return queryInterface.addIndex('tags', {
          fields: ['name'],
          unique: true
        })
      })
    }).then(() => {
      return queryInterface.createTable('post_tag', {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER
        },
        tagId: {
          allowNull: false,
          type: Sequelize.STRING(64),
          field: 'tag_id',
          references: {
            model: 'tags',
            key: 'id'
          }
        },
        postId: {
          allowNull: false,
          type: Sequelize.STRING(64),
          field: 'post_id',
          references: {
            model: 'posts',
            key: 'id'
          }
        }
      })
    }).then(() => {
      return queryInterface.createTable('comments', {
        id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: Sequelize.STRING(64)
        },
        postId: {
          allowNull: false,
          field: 'post_id',
          type: Sequelize.STRING(64),
          references: {
            model: 'posts',
            key: 'id'
          }
        },
        author: {
          type: Sequelize.STRING
        },
        avatar: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE
        },
        cursor: {
          type: Sequelize.STRING
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post_tag')
      .then(() => {
        return queryInterface.dropTable('comments')
      }).then(() => {
        return queryInterface.dropTable('tags')
      }).then(() => {
        return queryInterface.dropTable('posts')
      })
  }
}
