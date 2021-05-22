
export default function logger(req, res, next) {
  console.log(`Requesting from ${req.method} for url ${req.url}`)

  next()
}