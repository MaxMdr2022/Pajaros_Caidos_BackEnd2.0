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
          // Deserializa el JSON almacenado en la base de datos
          const image = this.getDataValue('image');
          const json = image ? JSON.parse(image) : [];
          if (json) {
            try {
              return JSON.parse(json.toString());
            } catch (error) {
              return json;
            }
          } else {
            console.log("json is null or undefined");
          }
        },
        set(image) {
          // Serializa el JSON antes de guardarlo en la base de datos
          this.setDataValue('image', JSON.stringify(image));
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Advertising
}
