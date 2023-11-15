import { UserListModel } from '../../storages/DB'
import bcrypt from 'bcrypt'
import UsersAdmins from '../admins/UsersAdmins'

const bulkCreateAdmin = async () => {
  try {
    for (let i = 0; i < UsersAdmins.length; i++) {
      const pass = process.env[`ADMIN_${i + 1}_PASS`]

      const email = process.env[`ADMIN_${i + 1}_EMAIL`]

      const hashedPassword = await bcrypt.hash(pass, 10)

      await UserListModel.findOrCreate({
        where: { email: email },

        defaults: {
          email: email,
          password: hashedPassword,
          first_name: UsersAdmins[i].first_name,
          last_name: UsersAdmins[i].last_name,
          nick_name: UsersAdmins[i].nick_name,
          avatar: UsersAdmins[i].avatar,
          isAdmin: UsersAdmins[i].isAdmin,
          isPrincipalAdmin: UsersAdmins[i].isPrincipalAdmin,
          userEmailValidate: UsersAdmins[i].userEmailValidate,
        },
      })
    }
  } catch (error) {
    console.error('Error creating users admin:', error)
  }
}

export default bulkCreateAdmin
