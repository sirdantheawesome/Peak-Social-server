import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

import Post from '../models/post.js'
import postData from './data/posts.js'
import User from '../models/user.js'
import userData from './data/users.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('connected')

    await mongoose.connection.db.dropDatabase()
    console.log('removed everything')

    const users = await User.create(userData)
    console.log(`added ${users.length} users`)

    const postDataWithUsers = postData.map(item => {
      return { ...item, user: users[0] }
    })

    await Post.create(postDataWithUsers)
    console.log('added the posts')

    await mongoose.connection.close()
    console.log('disconnected')

  } catch (error) {
    console.log(error)
    await mongoose.connection.close()
  }
}

seedDatabase()