import SMTPTransport = require("nodemailer/lib/smtp-transport");

export const mailerConfig: SMTPTransport.Options = {
  service: 'gmail',
  auth: {
    user: 'ngokhoghat@gmail.com',
    pass: 'Ngocdinh123456'
  }
}