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
      allowNull: false,
    },
    sePoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    seName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    seAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    seAddressDetail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    seAddressNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
