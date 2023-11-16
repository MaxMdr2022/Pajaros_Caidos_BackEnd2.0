import { UserListModel } from '../../storages/DB'
import bcrypt from 'bcrypt'
import UsersAdmins from '../admins/UsersAdmins'

const bulkCreateAdmin = async () => {
  try {
    for (let i = 0; i < UsersAdmins.length; i++) {
      const pass = process.env[`ADMIN_${i + 1}_PASS`]

      const email = process.env[`ADMIN_${i + 1}_EMAIL`]

      const hashedPassword = await bcrypt.hash(pass, 10)

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
    }
  } catch (error) {
    console.error('Error creating users admin:', error)
  }
}

export default bulkCreateAdmin
