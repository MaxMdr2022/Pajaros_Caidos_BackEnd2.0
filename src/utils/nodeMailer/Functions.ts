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
    'https://res.cloudinary.com/de5xjegp3/image/upload/v1700346206/Assets/navbar-logo_ljrvgg_credjd.webp'
  return {
    from: 'ONG Pajaros Caidos', // sender address
    to: `${email}`, // list of receivers
    subject: 'Active su cuenta Pájaros Caídos ahora', // Subject line
    html: `
      <div style="text-align: center; background-color: #790595e0; padding: 20px;">
        <p style="color: #ffffff;">
            Hola, ${first_name} Gracias por registrarte en Pájaros Caídos. Copie el siguiente código para verificar su correo electrónico. :D
        </p>
        <p style="background-color: #ffffff; color: #000000;">
            ${code}
        </p>
        <div style="border:solid white; display: inline-block; border-radius: 50%; background-color:#000000bf; width: 300px; height: 300px; overflow: hidden;">
            <img src='${image}' alt="imagen-logo-PajarosCaidos" style="width: 100%; height: auto;">
        </div>
        <p style="color: #ffffff;">ONG Pajaros Caidos</p>
    </div>
    `,

    // text: ``
  }
}

export const mailOptionGeneratePassword = (email: string, first_name: string, newPass: string) => {
  const image =
    'https://res.cloudinary.com/de5xjegp3/image/upload/v1700346206/Assets/navbar-logo_ljrvgg_credjd.webp'
  return {
    from: 'ONG Pajaros Caidos', // sender address
    to: `${email}`, // list of receivers
    subject: 'Recuperación de la cuenta Pajaros Caidos', // Subject line
    html: `
    <div style="text-align: center; background-color: #790595e0; padding: 20px;">
      <p style="color: #ffffff;">
        Hola, ${first_name}
        Se solicito generar una nueva contraseña de su cuenta en Pajaros Caidos.
        Una vez iniciada sesión con la nueva contraseña. Diríjase a su perfil y en configuración cree una nueva.
      </p>
        <p style="background-color: #ffffff; color: #000000;">
          ${newPass}
        </p>
        <div style="border:solid white; display: inline-block; border-radius: 50%; background-color:#000000bf; width: 300px; height: 300px; overflow: hidden;">
          <img src='${image}' alt="imagen-logo-PajarosCaidos" style="width: 100%; height: auto;">
        </div>
        <p style="color: #ffffff;">ONG Pajaros Caidos</p>
    </div>
    `,

    // text: ``
  }
}

export const sendEmail = (mailOption: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log('Error al enviar el email')
        reject('Failed to send verification email.')
      } else {
        console.log('El email se envió con éxito.')
        resolve('Verification email sent successfully.')
      }
    })
  })
}
