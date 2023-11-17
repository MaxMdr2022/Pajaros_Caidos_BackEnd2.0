import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const News = sequelize.define(
    'news',
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
      // video: {
      //     type: DataTypes.ARRAY(DataTypes.STRING),
      //     allowNull: false
      // },
      // isDeleted: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      //   allowNull: false,
      // },
    },
    {
      timestamps: true,
    }
  )

  return News
}
