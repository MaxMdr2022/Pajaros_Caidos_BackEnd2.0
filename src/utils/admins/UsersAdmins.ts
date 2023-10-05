const adminImage =
  'https://res.cloudinary.com/dzu7tm74o/image/upload/v1696543868/STATIC%20IMAGE/76795-200_kefpm3.png'

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
