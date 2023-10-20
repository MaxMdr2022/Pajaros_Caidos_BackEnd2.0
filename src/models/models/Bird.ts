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
      location: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          // Deserializa el JSON almacenado en la base de datos
          const location = this.getDataValue('location');
          const json = location ? JSON.parse(location) : [];
          return JSON.parse(json.toString());
        },
        set(location) {
          // Serializa el JSON antes de guardarlo en la base de datos
          this.setDataValue('location', JSON.stringify(location));
        },
      },
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
