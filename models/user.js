module.exports = (sequelize, DataTypes) => { 
  return sequelize.define('User', {
    usId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    usSocialId: {
      type: DataTypes.STRING(100),
    },
    usSocialValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usPassword: {
      type: DataTypes.STRING(100),
    },
    usPhoneNumber: { 
      type: DataTypes.STRING(20), 
      allowNull: false,
    }, 
    usName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    usPhoto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    usAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    usAddressDetail: {
      type: DataTypes.TEXT,  
      allowNull: false,
    },
    usAddressNumber: {
      type: DataTypes.STRING(100),  
      allowNull: false,
    },
    usAlarm: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    usGrant: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    usJwtToken: {
      type: DataTypes.STRING(255),
    },
    usFcmToken: {
      type: DataTypes.STRING(255),
    },
  },{ 
    timestamps:false, 
  }); 
};
