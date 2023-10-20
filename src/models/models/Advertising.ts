import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Advertising = sequelize.define(
    'advertising',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.JSON,
        allowNull: false,
        set(image) {
          const imageArray = Array.isArray(image) ? image : []

          this.setDataValue('image', imageArray)
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Advertising
}

//abrir mysql , levantar el server , abrir postman y crear un post y ver si lo trae
//para solucionar el tema del arreglo de objetos y no tener que tocar tanto codigo
