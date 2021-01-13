module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Post', { 
    poId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    }, 
    poUsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poPhoto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    poContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    poContent_photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    poRecord: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },{ 
    updatedAt: false,
    timestamps:true,
  }); 
  return model;
};
