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
        set(image) {
          const imageArray = Array.isArray(image) ? image : []

          this.setDataValue('image', imageArray)
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
