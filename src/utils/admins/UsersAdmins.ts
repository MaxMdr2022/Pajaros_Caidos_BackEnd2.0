const adminImage =
  'https://res.cloudinary.com/dzu7tm74o/image/upload/v1694102876/USER/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi_d5mmck.jpg'

const UsersAdmins = [
  {
    first_name: 'Tony',
    last_name: 'Stark',
    nick_name: 'Iron-man',
    avatar: {
      secure_url: adminImage,
    },
    isAdmin: true,
    isPrincipalAdmin: true,
    userEmailValidate: true,
  },
  {
    first_name: 'Clara',
    last_name: 'Correa',
    nick_name: 'Administrador',
    avatar: {
      secure_url: adminImage,
    },
    isAdmin: true,
    isPrincipalAdmin: true,
    userEmailValidate: true,
  },
]

export default UsersAdmins
