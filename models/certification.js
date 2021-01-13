module.exports = (sequelize, DataTypes) => { 
  let model = sequelize.define('Certification', { 
    cePhoneNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }, 
    ceNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },{ 
    timestamps: false,
  }); 
  model.removeAttribute('id');
  return model;
};
