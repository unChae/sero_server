module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Address', {
    adId : {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    adUsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    adAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    adAddressDetail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    adAddressNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },{ 
    timestamps: false,
  });
  return model;
};
