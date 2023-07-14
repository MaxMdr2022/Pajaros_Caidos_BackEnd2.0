import nodemailer from 'nodemailer'

export const codeUserVerification = () => {
  const characters = '0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return code
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //smtp.ethereal.email
  port: 465, //587
  secure: true, // true for 465, false for other ports
  auth: {
    user: `${process.env.NODEMAILER_GMAIL}`,
    pass: `${process.env.NODEMAILER_PASS_GMAIL}`,
  },
})

export const mailOption = (email: string, first_name: string, code: string) => {
  return {
    from: 'ONG Pajaros Caidos', // sender address
    to: `${email}`, // list of receivers
    subject: 'Activate Your Pajaros Caidos Account Now', // Subject line
    html: `
        <div>
          <p>
            Hello, ${first_name}
            Thank you for signing up for Pajaros Caidos.
            Copy the following code to verify your email. :D
          </p>
          ${code}
          <p>ONG Pajaros Caidos</p>
        </div>`,

    // text: ``
  }
}

export const sendEmail = (mailOption: any) => {
  transporter.sendMail(mailOption, async (err, info) => {
    if (err) {
      return 'Failed to send verification email.'
    } else {
      return 'Verification email sent successfully.'
    }
  })
}
