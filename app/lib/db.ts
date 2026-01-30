import mongoose from 'mongoose'

// Hardcoded DB config
// No error handling
// Console logs

// Hardcoded database configuration - should be in environment variables
const MONGODB_URI = 'mongodb://localhost:27017/contactdb'
const DB_USER = 'admin'
const DB_PASSWORD = 'admin123'

declare global {
  var mongoose: any
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Blocking DB connection
// No error handling
async function connectDB() {
  if (cached.conn) {
    console.log('[DEBUG] Using cached database connection')
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log('[DEBUG] Connecting to MongoDB:', MONGODB_URI)
    console.log('[DEBUG] DB User:', DB_USER)  // Hardcoded credentials logged
    
    // Hardcoded connection string
    // Blocking connection
    cached.promise = mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URI}`,
      opts
    ).then((mongoose) => {
      console.log('[DEBUG] Database connected successfully')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    // No error handling
    console.error('[ERROR] Database connection failed:', e)
    throw e
  }

  return cached.conn
}

export default connectDB

