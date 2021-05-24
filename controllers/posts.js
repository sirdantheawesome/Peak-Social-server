import Post from '../models/post.js'
import User from '../models/user.js'
import { NotFound } from '../lib/errors.js'

async function index(req, res, next) {
  try {
    const postList = await Post.find()
    res.status(200).json(postList)
    console.log('index Posts works')
  } catch (error) {
    next(error)
  }


}

async function show(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      throw new NotFound('no post found')
    }
    res.status(200).json(post)
    console.log('Show A Posts works')
  } catch (error) {
    next(error)
  }


}

async function createPost(req, res, next) {
  console.log('Create Post Test')
  next()
}

async function updatePost(req, res, next) {
  console.log('Update Post Test')
  next()
}

async function removePost(req, res, next) {
  console.log('Remove Post Test')
  next()
}

async function likePost(req, res, next) {
  req.body.user = req.currentUser
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      throw new NotFound('no post found')
    }
    console.log(req)


    post.userlikes.push(req.currentUser.id)

    const user = await User.findById(post.user)
    user.peekcoin = user.peekcoin + 1

    const savedUser = await user.save()

    console.log(savedUser)

    const savedPost = await post.save()

    res.send(savedPost)

    console.log('Liked Post')
  } catch (error) {
    next(error)
  }


}

async function unlikePost(req, res, next) {
  console.log('unLiked Post')
  next()
}

export default {
  index,
  show,
  createPost,
  updatePost,
  removePost,
  likePost,
  unlikePost,
}