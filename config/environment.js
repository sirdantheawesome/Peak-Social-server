import dotenv from 'dotenv'
dotenv.config()

export const dbURL = process.env.DB_URI || 'mongodb://localhost/peekdb'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'thequickbrownfoxjumpsoverthelazydog'
