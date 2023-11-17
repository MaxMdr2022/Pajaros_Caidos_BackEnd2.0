import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Publication = sequelize.define(
    'publication',
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
        // set(image) {
        //   // Serializa el JSON antes de guardarlo en la base de datos
        //   const imageArray = Array.isArray(image) ? image : []

        //   this.setDataValue('image', imageArray)
        // },
      },
      // video: {
      //     type: DataTypes.ARRAY(DataTypes.STRING),
      //     allowNull: false
      // },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Publication
}
