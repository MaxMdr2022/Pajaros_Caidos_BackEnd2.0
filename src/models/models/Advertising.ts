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
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Advertising
}
