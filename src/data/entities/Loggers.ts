import { Schema, model } from 'mongoose'

export const loggerSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts'
    },
    action: {
      type: String,
    },
    dataType: {
      type: String,
    },
    dataDisplay: {
      type: String,
    },
    userSeen: [{
      type: Schema.Types.ObjectId,
      ref: 'accounts'
    }],
    status: {
      type: String,
    },
    message: {
      type: Number,
    },
  },
  {
    timestamps: true
  })

export const Logger = model('loggers', loggerSchema)