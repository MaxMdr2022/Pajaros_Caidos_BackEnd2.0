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
          // Deserializa el JSON almacenado en la base de datos
          const image = this.getDataValue('image');
          const json = image ? JSON.parse(image) : [];
          return JSON.parse(json.toString());
        },
        set(image) {
          // Serializa el JSON antes de guardarlo en la base de datos
          this.setDataValue('image', JSON.stringify(image));
        },
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
