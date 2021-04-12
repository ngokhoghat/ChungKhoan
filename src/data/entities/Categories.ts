import { Schema, model } from 'mongoose'

export const categorySchema = new Schema(
  {
    displayName: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true
  })

export const Category = model('categories', categorySchema)