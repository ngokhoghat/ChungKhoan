import { Schema, model } from 'mongoose'

export const orderDetailSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    total: {
      type: Number,
    }
  },
  {
    timestamps: true
  })

export const OrderDetail = model('orderDetails', orderDetailSchema)