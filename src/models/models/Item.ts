import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Item = sequelize.define(
    'item',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const image = this.getDataValue('image')
          if (image && typeof image === 'string') {
            return JSON.parse(image)
          }
          return []
        },
      },
      //   category:{
      //     type:DataTypes.ARRAY(DataTypes.STRING),
      //     allowNull:false
      //   },
      price: {
        type: DataTypes.INTEGER, //float
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Item
}
