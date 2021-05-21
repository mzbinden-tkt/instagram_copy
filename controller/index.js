const express = require('express')
const router = express.Router()
const logger = require('../util/logger')
const comments = require('../domain/services/comment.service')
const users = require('../domain/services/user.service')
const posts = require('../domain/services/post.service')

console.log('[[ USERS ]]')
logger.LogInfo('[GET] = /users/:id')
logger.LogInfo('[GET] = /users/posts/:id')
logger.LogSuccess('[POST] = /users/')
/**
 * GET USER BY ID /users/:id
 * @param { id } id
 * @returns { user } {_id, username, password, email}
 */
router.get('/users/:id', users.GetById)

/**
 * GET POSTS USER BY ID /users/posts/:id
 * @param { id } id
 * @returns { Object } { posts: [] }
 */
router.get('/users/posts/:id', users.GetPosts)

/**
 * POST USER /users/
 * @param { Object } { username, password, email }
 * @return { Object } { id,  token}
 */
router.post('/users/', users.Create)

console.log('[[ COMMENTS ]]')
logger.LogInfo('[GET] = /comments/:id')
logger.LogSuccess('[POST] = /comments/:idPost')

/**
 * GET COMMENT  /comments/idPost
 * @param { idPost } id to post
 * @return { Object } { content }
 */
router.get('/comments/:id', comments.GetById)

/**
 * POST COMMENT /comments/idPost
 * @param { idPost } id to post
 * @return { Object } { }
 */
router.post('/comments/:idPost', comments.Create)

console.log('[[ POSTS ]]')
logger.LogInfo('[GET] = /posts/:id')
logger.LogInfo('[GET] = /posts/:size/:page')
logger.LogSuccess('[POST] = /posts/')

/**
 * GET POST  /posts/size/pag
 * @param { size, page } size per page
 * @return { Object } { posts: [] }
 */
router.get('/posts/:size/:page', posts.GetAll)

/**
 * GET POSTS /posts/id
 * @param { id } id
 * @return { Object } { post }
 */
router.get('/posts/:id', posts.GetById)

/**
 * POST POST /posts/
 * @return { Object } { }
 */
router.post('/posts/', posts.Create)

/**
 * PUT POST LIKES /posts/like/id
 * @param { idPost } id to post
 * @return { Object } { }
 */
router.put('/posts/like/:id', posts.AddLikes)

module.exports = router
