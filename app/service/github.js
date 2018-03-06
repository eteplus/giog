'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const axios = require('axios')
const models = require('../models')

const fetch = axios.create({
  baseURL: 'https://api.github.com/graphql'
})

fetch.interceptors.response.use(function(response) {
  return response.data || {}
}, function(error) {
  return Promise.reject(error)
})

const rootPath = path.resolve(__dirname, '../../')

const configPath = `${rootPath}/config`

/**
 * generate GraphQL query
 * @param {string} owner The login field of a user or organization
 * @param {string} repository The name of the repository
 * @param {number} first the first n elements from the list.
 * @param {string} after the elements in the list that come after the specified global ID
 * @see https://developer.github.com/v4/explorer/
 */
function generateQuery(owner, repository, first, after) {
  return `{
    repository(owner: "${owner}", name: "${repository}") {
      issues(orderBy: { field:CREATED_AT, direction:DESC }, first: ${first}, ${after}) {
        edges {
          node {
            id
            labels(last: 10) {
              nodes {
                id
                name
                color
              }
            }
            author {
              avatarUrl
              login
              resourcePath
              url
            }
            title
            bodyText
            bodyHTML
            createdAt
            publishedAt
            lastEditedAt
            url
            comments(first: 10) {
              edges {
                node {
                  id
                  author {
                    avatarUrl
                    login
                    resourcePath
                    url
                  }
                  bodyHTML
                  createdAt
                  lastEditedAt
                }
                cursor
              }
              totalCount
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
    rateLimit {
      limit
      cost
      remaining
      nodeCount
      resetAt
    }
  }`
}

/**
 * generate data
 * @param {array} pages all issues by pagenation
 */
async function generateData(pages) {
  const { Post, Tag, Comment, PostTag } = models
  try {
    const options = {
      logging: false
    }

    for (const page of pages) {
      const { edges } = page
      for (const edge of edges) {
        const node = edge.node
        const post = {
          id: node.id,
          title: node.title,
          summary: node.bodyText.slice(0, 120),
          content: node.bodyHTML,
          avatar: node.author.avatarUrl,
          author: node.author.login,
          github: node.author.url,
          createdAt: node.createdAt,
          publishedAt: node.publishedAt,
          updatedAt: node.lastEditedAt,
          url: node.url,
          commentCount: node.comments.totalCount
        }
        const spinner = ora().start()
        spinner.succeed(post.title)
        await Post.upsert(post, options)

        // tag
        for (const tag of node.labels.nodes) {
          Tag.upsert({
            id: tag.id,
            name: tag.name
          }, options)
          PostTag.upsert({
            tagId: tag.id,
            postId: post.id
          }, options)
        }

        // comment
        const comments = node.comments.edges
        for (const item of comments) {
          const cursor = item.cursor
          const comment = item.node
          const data = {
            id: comment.id,
            postId: post.id,
            author: comment.author.login,
            avatar: comment.author.avatarUrl,
            content: comment.bodyHTML,
            createdAt: comment.createdAt,
            updatedAt: comment.lastEditedAt,
            cursor
          }
          Comment.upsert(data, options)
        }
      }
    }
  } catch (error) {
    throw error
  }
}

class Github {
  async fetch() {
    let hasNextPage = true
    let currentPage = 1
    let cursor = ''

    try {
      const config = JSON.parse(fs.readFileSync(`${configPath}/github.json`))
      const pages = []
      const strong = str => chalk.bold.blue(str)
      const log = str => console.log(str)
      const tlog = str => console.log(chalk.keyword('orange').bold(str))

      log(chalk.keyword('orange').bold('Configure:\n'))
      log(`${strong('Author')}: ${config.owner}`)
      log(`${strong('Repository')}: ${config.repository}`)
      log(`${strong('PageSize')}: ${config.pageSize}`)
      log(`${strong('AccessToken')}: ${config.accessToken}\n`)

      tlog('Fetch issues from github repository...\n')

      while (hasNextPage) {
        const spinner = ora('fetching...').start()
        const after = currentPage > 1 ? `after: "${cursor}"` : ''
        const response = await fetch({
          method: 'POST',
          headers: {
            Authorization: `bearer ${config.accessToken}`
          },
          data: {
            query: generateQuery(config.owner, config.repository, config.pageSize, after)
          }
        })
        spinner.succeed(`The issues of the ${currentPage} page is fetched successfully`)
        if (!response.data) {
          throw new Error(JSON.stringify(response.errors))
        }
        const data = response.data
        const { repository, rateLimit } = data
        const { issues } = repository
        const { edges, pageInfo } = issues
        pages.push({
          currentPage,
          edges,
          hasNextPage: pageInfo.hasNextPage
        })
        hasNextPage = pageInfo.hasNextPage
        cursor = pageInfo.endCursor
        currentPage += 1
        if (!hasNextPage) {
          tlog('\nRateLimit:\n')
          log(`${strong('Limit')}: ${rateLimit.limit}`)
          log(`${strong('Remaining')}: ${rateLimit.remaining}`)
          log(`${strong('ResetAt')}: ${rateLimit.resetAt}\n`)
        }
      }

      tlog('Generate data...\n')

      await generateData(pages)
      return true
    } catch (error) {
      throw error
    }
  }
}

module.exports = Github
