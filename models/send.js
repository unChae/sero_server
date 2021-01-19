module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Send', { 
    seId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    seUsId: {
      type: DataTypes.INTEGER,
    },
    sePoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seName: {
      type: DataTypes.STRING(255),
    },
    sePhoneNumber: {
      type: DataTypes.STRING(100),
    },
    seAddress: {
      type: DataTypes.STRING(255),
    },
    seAddressDetail: {
      type: DataTypes.STRING(255),
    },
    seAddressNumber: {
      type: DataTypes.STRING(100),
    },
    seStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }
  },{ 
    updatedAt: false,
    timestamps: true,
  }); 
  return model;
};
