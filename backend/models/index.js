import mongoose from 'mongoose'

export const MODEL_NAME = 'todos'

/**
 * define model
 */
const schema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  weight: Number
})
export default mongoose.model(MODEL_NAME, schema)