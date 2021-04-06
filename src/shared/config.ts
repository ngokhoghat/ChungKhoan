import * as session from 'express-session'

export const expressSessionConfig: session.SessionOptions = {
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }
}