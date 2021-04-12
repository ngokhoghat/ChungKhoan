import { Schema, model } from 'mongoose'

export const paymentSchema = new Schema(
  {

  },
  {
    timestamps: true
  })

export const Payment = model('payments', paymentSchema)