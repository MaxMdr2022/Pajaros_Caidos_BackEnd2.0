import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Bird = sequelize.define(
    'bird',
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
      scientificName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // image: {
      //   type: DataTypes.ARRAY(DataTypes.JSON),
      //   allowNull: false,
      // },
      // location: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   allowNull: false,
      // },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Bird
}
