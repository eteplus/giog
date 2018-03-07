const Router = require('koa-router')
const db = require('../models')

const router = new Router({
  prefix: '/api'
})

router.use(async (ctx, next) => {
  ctx.type = 'json'
  ctx.success = ({ data, message }) => {
    ctx.body = {
      code: 0,
      message: message || 'success',
      data
    }
  }
  ctx.fail = ({ code, error, message }) => {
    ctx.body = {
      code: code || -1,
      message: message || 'error',
      error
    }
  }
  await next()
})

router.get('/posts', async (ctx, next) => {
  try {
    const page = ctx.query.page || 1
    const pageSize = ctx.query.pageSize || 8
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const sql = `SELECT
      DISTINCT(posts.id) AS id,
      posts.title AS title,
      posts.summary As summary,
      posts.created_at As created_at,
      tags.id AS "tag_id",
      tags.name AS "tag_name"
    FROM
      posts
      LEFT JOIN post_tag ON posts.id = post_tag.post_id
      LEFT JOIN tags ON tags.id = post_tag.tag_id
    WHERE posts.id IN (SELECT id FROM posts ORDER BY created_at DESC LIMIT ${offset}, ${limit})
    ORDER BY
      posts.created_at DESC;`
    const result = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    const posts = {}
    const data = []
    for (const post of result) {
      if (!posts[post.id]) {
        posts[post.id] = {
          id: post.id,
          title: post.title,
          createdAt: post.created_at,
          summary: post.summary,
          tags: [
            {
              id: post.tag_id,
              name: post.tag_name
            }
          ]
        }
      } else {
        posts[post.id].tags.push({
          id: post.tag_id,
          name: post.tag_name
        })
      }
    }
    for (let id in posts) {
      data.push(posts[id])
    }
    ctx.success({
      data
    })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

router.get('/post/:id', async (ctx, next) => {
  try {
    const id = ctx.params.id
    const sql = `SELECT
      DISTINCT(posts.id) AS id,
      posts.title AS title,
      posts.content As content,
      posts.created_at As created_at,
      posts.comment_count As comment_count,
      posts.url As url,
      tags.id AS "tag_id",
      tags.name AS "tag_name"
    FROM
      posts
      LEFT JOIN post_tag ON posts.id = post_tag.post_id
      LEFT JOIN tags ON tags.id = post_tag.tag_id
    WHERE posts.id = '${id}';`
    const result = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    let data = null
    for (const post of result) {
      if (!data) {
        data = {
          id: post.id,
          title: post.title,
          content: post.content,
          commentCount: post.comment_count,
          url: post.url,
          createdAt: post.created_at,
          tags: [
            {
              id: post.tag_id,
              name: post.tag_name
            }
          ]
        }
      } else {
        data.tags.push({
          id: post.tag_id,
          name: post.tag_name
        })
      }
    }
    ctx.success({
      data
    })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

router.get('/comments', async (ctx, next) => {
  try {
    const page = ctx.query.page || 1
    const pageSize = ctx.query.pageSize || 10
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const id = ctx.query.id
    const sql = `SELECT
      id,
      author,
      avatar,
      association,
      content,
      created_at AS createdAt
    FROM
      comments
    WHERE
      post_id = '${id}'
    ORDER BY
      created_at DESC
    LIMIT ${offset}, ${limit};`
    const data = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    ctx.success({ data })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

router.get('/tags', async (ctx, next) => {
  try {
    const sql = `SELECT id, name FROM tags`
    const data = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    ctx.success({ data })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

router.get('/tag/:tag', async (ctx, next) => {
  try {
    const { tag } = ctx.params
    const page = ctx.query.page || 1
    const pageSize = ctx.query.pageSize || 8
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const sql = `
      SELECT
        DISTINCT(posts.id) As id,
        posts.title As title,
        posts.created_at As createdAt
      FROM
        posts
      LEFT JOIN post_tag ON posts.id = post_tag.post_id
      LEFT JOIN tags ON tags.id = post_tag.tag_id
      WHERE tags.name = '${tag}'
      ORDER BY posts.created_at DESC
      LIMIT ${offset}, ${limit};`
    const data = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    ctx.success({ data })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

router.get('/archives', async (ctx, next) => {
  try {
    const page = ctx.query.page || 1
    const pageSize = ctx.query.pageSize || 20
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const sql = `SELECT
      id,
      title,
      created_at AS createdAt
    FROM
      posts
    ORDER BY
      created_at DESC
    LIMIT ${offset}, ${limit};`
    const data = await db.sequelize.query(sql, {
      raw: true,
      benchmark: true,
      type: db.Sequelize.QueryTypes.SELECT
    })
    ctx.success({ data })
  } catch (error) {
    ctx.fail({
      error: error.message
    })
  }
})

module.exports = router
