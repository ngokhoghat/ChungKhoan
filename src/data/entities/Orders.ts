import { Schema, model } from 'mongoose'

export const orderSchema = new Schema(
  {
    orderList: [{
      type: Schema.Types.ObjectId,
      ref: 'orderDetails'
    }],
    discount: {
      type: Number
    },
    totalPrice: {
      type: Number
    },
    finalPrice: {
      type: Number
    }
  },
  {
    timestamps: true
  })

export const Order = model('orders', orderSchema)