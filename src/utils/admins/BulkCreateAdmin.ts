import { UserListModel } from '../../storages/DB'
import bcrypt from 'bcrypt'
import UsersAdmins from '../admins/UsersAdmins'

const bulkCreateAdmin = async () => {
  try {
    for (let i = 0; i < UsersAdmins.length; i++) {
      const passEnv = `ADMIN_${i + 1}_PASS`
      const emailEnv = `ADMIN_${i + 1}_EMAIL`

      const pass = process.env[passEnv]
      const email = process.env[emailEnv]

      if (!pass || !email) {
        console.error(`Las variables de entorno ${passEnv} y ${emailEnv} deben estar configuradas.`)
        continue
      }

      const hashedPassword = await bcrypt.hash(pass, 10)

      const existingAdmin = await UserListModel.findOne({
        where: { email },
      })

      if (!existingAdmin) {
        await UserListModel.create({
          email,
          password: hashedPassword,
          first_name: UsersAdmins[i].first_name,
          last_name: UsersAdmins[i].last_name,
          nick_name: UsersAdmins[i].nick_name,
          avatar: UsersAdmins[i].avatar,
          isAdmin: UsersAdmins[i].isAdmin,
          isPrincipalAdmin: UsersAdmins[i].isPrincipalAdmin,
          userEmailValidate: UsersAdmins[i].userEmailValidate,
        })
      }
    }
  } catch (error) {
    console.error('Error creando usuarios administrativos:', error)
    throw error
  }
}

export default bulkCreateAdmin
/*
const admin = await UserListModel.findOne({ where: { email } })
      console.log(`Email: ${email}, Admin: ${admin}`)
      if (!admin) {
        console.log('creado:: ', email, 'i:: ', i)

        await UserListModel.create({
          email: email,
          password: hashedPassword,
          first_name: UsersAdmins[i].first_name,
          last_name: UsersAdmins[i].last_name,
          nick_name: UsersAdmins[i].nick_name,
          avatar: UsersAdmins[i].avatar,
          isAdmin: UsersAdmins[i].isAdmin,
          isPrincipalAdmin: UsersAdmins[i].isPrincipalAdmin,
          userEmailValidate: UsersAdmins[i].userEmailValidate,
        })
      } else {
        console.log('no se creo:: ', email)
      }


*/
