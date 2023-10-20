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
        allowNull: false,
        get() {
          // Deserializa el JSON almacenado en la base de datos
          const image = this.getDataValue('image');
          var json = image ? JSON.parse(image) : "";
          if (json) {
            try {
              return {
                public_id: json && json.toString() ? JSON.parse(json.toString()).public_id : "",
                secure_url: json ? JSON.parse(json.toString()).secure_url : "",
                imageUrl: json && json.toString() ? JSON.parse(json.toString()).imageUrl : "",
              };
            } catch (error) {
              return json;
            }
          } else {
            console.log("json is null or undefined");
          }
        },
      },
    },
    {
      timestamps: true,
    }
  )

  return Banner
}
