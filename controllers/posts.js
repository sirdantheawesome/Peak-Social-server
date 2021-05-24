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
  console.log('Create Post Start...')
  req.body.user = req.currentUser
  console.log()
  try {
    const newPost = await Post.create(req.body)
    res.status(201).json(newPost)
  } catch (e) {
    next(e)
  }
  next()
}

async function updatePost(req, res, next) {
  console.log('Update Post Start...')
  try {
    const currentUserId = req.currentUser._id
    console.log(currentUserId)
    const post = await Post.findById(req.params.postId)
    console.log(post)

    if (!post) {
      throw new NotFound('No User Found')
    }

    if (!currentUserId.equals(post.user._id)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    post.set(req.body)
    post.save()

    res.status(202).json(post)
  } catch (e) {
    next(e)
  }
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

    if (post.userlikes.includes(req.currentUser.id)) {
      const userIndex = post.userlikes.findIndex(likes => likes === 'req.currentUser.id')
      post.userlikes.splice(userIndex,1)

      const user = await User.findById(post.user)
      user.peekcoin = user.peekcoin - 1

      const savedUser = await user.save()

      console.log(savedUser)

      const savedPost = await post.save()

      res.send(savedPost)

      console.log('unLiked Post')
    } else {
      post.userlikes.push(req.currentUser.id)

      const user = await User.findById(post.user)
      user.peekcoin = user.peekcoin + 1

      const savedUser = await user.save()

      console.log(savedUser)

      const savedPost = await post.save()

      res.send(savedPost)

      console.log('Liked Post')
    }


  } catch (error) {
    next(error)
  }


}



export default {
  index,
  show,
  createPost,
  updatePost,
  removePost,
  likePost,
}