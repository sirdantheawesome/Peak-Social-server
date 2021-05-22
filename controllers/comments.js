

async function createComment(req, res, next) {
  console.log('Create Comment Test')
  next()
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