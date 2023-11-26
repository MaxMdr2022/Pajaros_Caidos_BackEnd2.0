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
        get() {
          const image = this.getDataValue('image')
          if (image && typeof image === 'string') {
            return JSON.parse(image)
          }
          return []
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Advertising
}
