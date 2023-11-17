import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Banner = sequelize.define(
    'banner',
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
      image: {
        type: DataTypes.JSON,
        get() {
          const image = this.getDataValue('avatar')
          if (image && typeof image === 'string') {
            return JSON.parse(image)
          }
          return image
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Banner
}
