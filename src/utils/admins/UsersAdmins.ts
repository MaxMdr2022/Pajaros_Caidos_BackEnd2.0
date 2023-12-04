const adminImage =
  'https://res.cloudinary.com/de5xjegp3/image/upload/v1701653397/STATIC%20IMAGE/76795-200_kefpm3_lunp5a.png'

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
