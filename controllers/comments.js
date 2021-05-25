import Post from '../models/post.js'
import User from '../models/user.js'
import { NotFound } from '../lib/errors.js'



async function createComment(req, res, next) {
  console.log('Create Comment Test')
  req.body.user = req.currentUser
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
    const savedPostWithComment = await post.save()
    res.send(savedPostWithComment)
  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  try {
    console.log('Edit Comment Test')
    const { postId, commentId } = req.params
    const post = await Post.findById(postId)
    if (!post) {
      throw new NotFound('Comment Not Found')
    }
    const comment = post.comments.id(commentId)
    if (!req.currentUser._id.equals(comment.user)){
      console.log('COMMENT: ', comment )
      return res.status(401).send({ message: 'Unauthorized - did you make this comment?' })
    }
    comment.set(req.body)
    const savedPostWithEditedComment = await post.save()
    res.send(savedPostWithEditedComment)
  } catch (err) {
    next(err)
  }
}

async function removeComment(req, res, next) {
  try {
    console.log('Delete Comment Test')
    const { postId, commentId } = req.params
    console.log(req.params)
    const post = await Post.findById(postId)
    console.log(post)
    if (!post) {
      throw new NotFound('comment not found')
    }
    const comment = post.comments.id(commentId)
    console.log(comment)
    if (!req.currentUser._id.equals(comment.user)) {
      return res.status(401).send({ message: 'Unauthorized - did you make this comment' })
    }
    console.log('soooo close...')
    await comment.remove()
    const savedPost = await post.save()
    res.send(savedPost)
    console.log('comment deleted')

  } catch (err) {

    next(err)
  }
}




async function likeComment(req, res, next) {
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
      const savedPost = await post.save()
      res.send(savedPost)
      console.log('unLiked Comment')
    } else {
      post.userlikes.push(req.currentUser.id)
      const user = await User.findById(post.user)
      user.peekcoin = user.peekcoin + 1
      const savedUser = await user.save()
      const savedPost = await post.save()
      res.send(savedPost)
      console.log('Liked Comment')
    }


  } catch (error) {
    next(error)
  }
}


export default {
  createComment,
  updateComment,
  removeComment,
  likeComment,
}