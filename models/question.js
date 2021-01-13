module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Question', { 
    quId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    }, 
    quUsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quSeId: {
      type: DataTypes.INTEGER,
    },
    quCaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quParentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  },{ 
    timestamps:true, 
    updatedAt: false,
  }); 
  return model;
};
