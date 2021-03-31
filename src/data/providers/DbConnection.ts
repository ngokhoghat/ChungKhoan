import * as mongoose from 'mongoose'
export default class DBConnection {
  constructor() { }

  static connect() {
    mongoose.connect(process.env.DB_HOST, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const db = mongoose.connection;
    db.once('open', () => console.log('===== DB Connected ====='))
  }
}