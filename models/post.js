import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  userlikes: { type: Number, required: false },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})

export default mongoose.model('Post', postSchema)