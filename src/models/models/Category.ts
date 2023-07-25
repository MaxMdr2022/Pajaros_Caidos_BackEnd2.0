import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Category
}
