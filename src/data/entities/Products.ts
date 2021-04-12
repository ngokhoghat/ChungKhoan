import { Schema, model } from 'mongoose'

export const productSchema = new Schema(
  {
    displayName: {
      type: String,
      required: [true, 'Name is required.'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },
    imageLinks: {
      type: String,
      required: [true, 'Image is required.'],
    },
    price: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true
  })

export const Product = model('products', productSchema)