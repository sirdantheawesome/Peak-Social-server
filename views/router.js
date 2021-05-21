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
  .put(postController.likePost)
  .delete(postController.removePost)
