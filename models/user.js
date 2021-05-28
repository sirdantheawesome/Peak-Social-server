import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  summary: { type: String },
  peekcoin: { type: Number },
})


userSchema.pre('save', function encryptPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })



userSchema.plugin(mongooseUniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: false } }))
export default mongoose.model('User', userSchema)