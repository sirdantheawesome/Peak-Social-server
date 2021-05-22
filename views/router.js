import express from 'express'
import commentController from '../controllers/comments.js'
import postController from '../controllers/posts.js'
import userContreoller from '../controllers/users.js'

const router = express.Router()

// * Post

router.route('/posts')
  .get(postController.index)
  .post(postController.createPost)

router.route('/posts/:postId')
  .get(postController.show)
  .put(postController.updatePost)
  .post(postController.likePost)
  .delete(postController.removePost)

// * Comments

router.route('/posts/:postId/comments')
  .post(commentController.createComment)

router.route('/posts/:postId/comments/:commentId')
  .put(commentController.updateComment)
  .post(commentController.likeComment)
  .delete(commentController.removeComment)

// * Users

router.route('/login')
  .post(userContreoller.login)

router.route('/register')
  .post(userContreoller.register)

router.route('/profile/:profileId')
  .put(userContreoller.updateComment)