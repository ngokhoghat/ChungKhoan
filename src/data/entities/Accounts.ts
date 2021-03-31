import { Schema, model } from 'mongoose'

export const accountSchema = new Schema({
    displayName: {
        type: String,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    imageLinks: [{
        type: Schema.Types.ObjectId,
        ref: 'Images'
    }],
    roles: {
        type: String,
        required: [true, 'Roles is required.'],
    },
},
    {
        timestamps: true
    })

export const Account = model('account', accountSchema)