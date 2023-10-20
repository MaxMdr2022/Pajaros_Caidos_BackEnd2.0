import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Item = sequelize.define(
    'item',
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
      //   category:{
      //     type:DataTypes.ARRAY(DataTypes.STRING),
      //     allowNull:false
      //   },
      price: {
        type: DataTypes.INTEGER, //float
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Item
}
