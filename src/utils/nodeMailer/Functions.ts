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
  const image =
    'https://res.cloudinary.com/dzu7tm74o/image/upload/v1699296763/STATIC%20IMAGE/navbar-logo_ljrvgg.webp'
  return {
    from: 'ONG Pajaros Caidos', // sender address
    to: `${email}`, // list of receivers
    subject: 'Active su cuenta Pájaros Caídos ahora', // Subject line
    html: `
      <div style="text-align: center; background-color: #790595e0; padding: 20px;">
        <p>
          Hola, ${first_name} Gracias por registrarte en Pájaros Caídos. Copie el siguiente código para verificar su correo electrónico. :D
        </p>
        <p style="background-color: #ffffff; color: #000000;">
          ${code}
        </p>
        <div style="border:solid white; display: inline-block; border-radius: 50%; background-color:#000000bf; width: 300px; height: 300px;">
          <img src='${image}' alt="imagen-logo-PajarosCaidos" style=" width: 300px; height: 250px; ">
        </div>
        <p>ONG Pajaros Caidos</p>
    </div>
    `,

    // text: ``
  }
}

export const mailOptionGeneratePassword = (email: string, first_name: string, newPass: string) => {
  return {
    from: 'ONG Pajaros Caidos', // sender address
    to: `${email}`, // list of receivers
    subject: 'Recuperación de la cuenta Pajaros Caidos', // Subject line
    html: `
        <div>
          <p>
            Hola, ${first_name}
            Se solicito generar una nueva contraseña de su cuenta en Pajaros Caidos.
            Una vez iniciada sesión con la nueva contraseña. Diríjase a su perfil y en configuración cree una nueva.
          </p>
          <p>Su nueva contraseña: </p>
          ${newPass}
          <p>ONG Pajaros Caidos</p>
        </div>`,

    // text: ``
  }
}

export const sendEmail = (mailOption: any): any => {
  transporter.sendMail(mailOption, async (err, info) => {
    if (err) {
      console.log('Error al enviar el email')

      return 'Failed to send verification email.'
    } else {
      console.log('el email se envió con éxito.')

      return 'Verification email sent successfully.'
    }
  })
}
