import Post from '../models/post.js'
import { NotFound } from '../lib/errors.js'



async function createComment(req, res, next) {
  console.log('Create Comment Test')
  req.body.user = req.currentUser 
  console.log(req.currentUser)
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user')
      .populate('comments.user')
    console.log(req)
    if (!post) {
      throw new NotFound('No Post Found.. ')
    }
    console.log(req.body)
    post.comments.push(req.body)
    console.log('made it to past post.comments.push')
    const savedPostWithComment = await post.save()
    res.send(savedPostWithComment)
  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  console.log('Edit Comment Test')
  next()
}

async function removeComment(req, res, next) {
  console.log('Delete Comment Test')
  next()
}

async function likeComment(req, res, next) {
  console.log('Like Comment Test')
  next()
}

export default {
  createComment,
  updateComment,
  removeComment,
  likeComment,
}