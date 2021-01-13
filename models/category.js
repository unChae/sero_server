module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Category', { 
    caId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    }, 
    caContent: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },{ 
    timestamps:false, 
  }); 
  return model;
};
