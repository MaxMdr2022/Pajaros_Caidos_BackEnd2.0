import { DataTypes } from 'sequelize'

const user = (sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      nick_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.JSON,
        get() {
          // Deserializa el JSON almacenado en la base de datos
          const avatar = this.getDataValue('avatar');
          var json = avatar ? JSON.parse(avatar) : "";
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
        set(avatar) {
          // Serializa el JSON antes de guardarlo en la base de datos
          this.setDataValue('avatar', JSON.stringify(avatar));
        },
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        defaultValue: '9999-12-31',
      },
      description: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      emailValidateCode: {
        type: DataTypes.STRING,
      },
      isVoluntary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isPrincipalAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      formComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userEmailValidate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      registerWithAuth0: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return User
}

export default user
