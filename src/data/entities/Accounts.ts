import { Schema, model } from 'mongoose'

export const accountSchema = new Schema(
  {
    displayName: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
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
      required: [true, 'Password is required.'],
    },
    imageLinks: {
      type: String,
      required: [true, 'Image is required.'],
    },
    roles: {
      type: String,
    },
    securityCode: {
      type: String
    }
  },
  {
    timestamps: true
  })

export const Account = model('accounts', accountSchema)