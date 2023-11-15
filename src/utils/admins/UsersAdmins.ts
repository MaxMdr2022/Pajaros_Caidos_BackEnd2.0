const adminImage =
  'https://res.cloudinary.com/dzu7tm74o/image/upload/v1696543868/STATIC%20IMAGE/76795-200_kefpm3.png'

const UsersAdmins = [
  //----------------Usuario de prueba----------------------------------
  {
    first_name: 'Usuario',
    last_name: 'Prueba',
    nick_name: 'User-test',
    avatar: {
      secure_url: adminImage,
    },
    isAdmin: true,
    isPrincipalAdmin: true,
    userEmailValidate: true,
  },
  {
    //---------datos de Nico ------------------
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
]

export default UsersAdmins
