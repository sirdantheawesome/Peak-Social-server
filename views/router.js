import express from 'express'
import commentController from '../controllers/comments.js'
import postController from '../controllers/posts.js'
import userController from '../controllers/users.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

// * Post

router.route('/posts')
  .get(postController.index)
  .post(secureRoute, postController.createPost)

router.route('/posts/:postId')
  .get(postController.show)
  .put(secureRoute, postController.updatePost)
  .post(secureRoute, postController.likePost)
  .delete(secureRoute, postController.removePost)

// * Comments

router.route('/posts/:postId/comments')
  .post(secureRoute, commentController.createComment)

router.route('/posts/:postId/comments/:commentId')
  .put(secureRoute, commentController.updateComment)
  .post(secureRoute, commentController.likeComment)
  .delete(secureRoute, commentController.removeComment)

// * Users

router.route('/login')
  .post(userController.login)

router.route('/register')
  .post(userController.register)

router.route('/profile')
  .get(userController.indexProfiles)

router.route('/profile/:profileId')
  .put(secureRoute, userController.updateProfile)
  .get(userController.showProfile)

export default router