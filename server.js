import app from './app.js'
import connectToDb from './db/connectToDb.js'


async function startApp() {

  try {
    await connectToDb()
    console.log('database working')
    app.listen(4000, () => console.log('i think im working'))

  } catch (error) {
    console.log('something went wrong')
    console.log(error)
  }


}

startApp()