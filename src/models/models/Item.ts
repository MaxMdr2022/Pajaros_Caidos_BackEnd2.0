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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
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
