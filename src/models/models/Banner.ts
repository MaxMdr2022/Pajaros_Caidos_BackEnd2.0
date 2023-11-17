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
          const avatarUser = this.getDataValue('avatar')
          return avatarUser ? JSON.parse(avatarUser) : null
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Banner
}
