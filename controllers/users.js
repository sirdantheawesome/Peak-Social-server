import User from '../models/user.js'

import { NotFound, NotValid, UserNotMatched } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function login(req, res, next) {
  console.log('Login Test')
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
      throw new NotValid('there was a problem logging in.')
    }

    const isValidPw = user.validatePassword(req.body.password)
    if (!isValidPw) {
      throw new NotValid('there was a problem logging in.')
    }

    const token = jwt.sign(

      { userId: user._id },
      secret,
      { expiresIn: '12h' }

    )
    console.log('login successful')
    res.status(202).json({ user, token })
  } catch (error) {
    next(error)
  }
}

async function register(req, res, next) {
  console.log('Register Test')
  try {
    const requestAddCoin = req.body
    requestAddCoin.peekcoin = 0
    const user = await User.create(requestAddCoin)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

async function updateProfile(req, res, next) {
  console.log('Update Profile Test')
  try {
    const updatedUser = req.body
    const id = req.params.profileId
    const currentUserId = req.currentUser._id

    console.log(`newUserData: ${updatedUser}, id: ${id}, currentUserId ${currentUserId}`)
    const user = await User.findById(id)
    console.log('User is: ', user)
    if (!user) {
      throw new NotFound('User not found')
    }

    if (!currentUserId.equals(id)) {
      throw new UserNotMatched('User does not match edit')
    }
    user.set(updatedUser)
    user.save()

    console.log('Updated Profile: ', updatedUser)
    res.status(202).json(updatedUser)
  } catch (e) {
    console.log('Failed to update profile: ', e)
    next(e)
  }
}

async function indexProfiles(req, res, next) {
  console.log('Index Profile Start...')
  try {
    const userList = await User.find()
    res.status(200).json(userList)
  } catch (e) {
    console.log('Fetching Profile Data Failed: ', e)
    next(e)
  }
}

async function showProfile(req, res, next) {
  console.log('Show Profile Start...')
  const id = req.params.profileId
  console.log(req.params.profileId)
  try {
    const user = await User.findById(id)
    console.log('Fetched hero data of id: ', id, user)
    if (!user) {
      throw new NotFound('User not Found')
    }
    res.status(201).json(user)
  } catch (e) {
    console.log('Fetching user data failed: ', e)
    next(e)
  }
}

export default {
  login,
  register,
  updateProfile,
  indexProfiles,
  showProfile,
}