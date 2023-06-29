import mongoose, { ConnectionStates } from 'mongoose'

type Connection = {
  isConnected: ConnectionStates
}

export const connection: Connection = {
  isConnected: 0, // disconnected: 0, connected: 1, connecting: 2, disconnecting: 3,uninitialized: 99
}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '')
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
