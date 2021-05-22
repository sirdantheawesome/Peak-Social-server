

async function index(req, res, next) {
  console.log('Show Posts Test')
  next()
}

async function show(req, res, next) {
  console.log('Show A Posts Test')
  next()
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
  console.log('Like Post Test')
  next()
}

export default {
  index,
  show,
  createPost,
  updatePost,
  removePost,
  likePost,
}