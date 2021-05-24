
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'



export default function secureRoute(req, res, next) {

  const rawToken = req.headers.authorization
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = rawToken.replace('Bearer ', '')
  console.log('Token:', token)

  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      console.log('Unauthorized Bad Token')
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const user = await User.findById(payload.profileId)
    if (!user) {
      console.log('Unauthorized Bad User')
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.currentUser = user
    next()
  })
}