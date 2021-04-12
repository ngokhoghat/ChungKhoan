import { Schema, model } from 'mongoose'

export const userSchema = new Schema(
  {
    displayName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    phoneNumber: {
      type: String
    },
    password: {
      type: String,
    },
    imageLinks: {
      type: String,
    },
  },
  {
    timestamps: true
  })

export const User = model('users', userSchema)