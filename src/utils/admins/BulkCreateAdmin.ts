import { UserListModel } from '../../storages/DB'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'

const bulkCreateAdmin = async () => {
  const __dirname = path.resolve()
  const data = fs.readFileSync(
    path.join(__dirname, '../Back-End/src/utils/admins/UsersAdmins.json'),
    'utf8'
  )
  const objectJSON = JSON.parse(data)

  //   console.log('dataJSON ', objectJSON[0].first_name)

  for (let i = 0; i < objectJSON.length; i++) {
    const pass = process.env[`ADMIN_${i + 1}_PASS`]

    const email = process.env[`ADMIN_${i + 1}_EMAIL`]

    const hashedPassword = await bcrypt.hash(pass, 10)

    await UserListModel.findOrCreate({
      where: { email: email },

      defaults: {
        email: email,
        password: hashedPassword,
        first_name: objectJSON[i].first_name,
        last_name: objectJSON[i].last_name,
        nick_name: objectJSON[i].nick_name,
        avatar: objectJSON[i].avatar,
        isAdmin: objectJSON[i].isAdmin,
        isPrincipalAdmin: objectJSON[i].isPrincipalAdmin,
        userEmailValidate: objectJSON[i].userEmailValidate,
      },
    })
  }
}

export default bulkCreateAdmin
