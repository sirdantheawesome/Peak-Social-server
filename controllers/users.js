

async function login(req, res, next) {
  console.log('Login Test')
  next()
}

async function register(req, res, next) {
  console.log('Register Test')
  next()
}

async function updateProfile(req, res, next) {
  console.log('Update Profile Test')
  next()
}

export default {
  login,
  register,
  updateProfile,
}