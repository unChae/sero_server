var path = require('path'); 
var Sequelize = require('sequelize'); 
var env = process.env.NODE_ENV || 'development'; 
var config = require(path.join(__dirname, '..', 'config.json'))[env]; 
var db = {}; 
var sequelize = new Sequelize(config.database, config.username, config.password, config); 

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

db.user = require('./user')(sequelize, Sequelize); 
db.address = require('./address')(sequelize, Sequelize); 
db.certification = require("./certification")(sequelize, Sequelize);
db.send = require('./send')(sequelize, Sequelize); 
db.post = require('./post')(sequelize, Sequelize); 
db.question = require('./question')(sequelize, Sequelize); 
db.category = require('./category')(sequelize, Sequelize); 

db.address.belongsTo(db.user, {foreignKey: 'adUsId', targetKey: 'usId'});

db.send.belongsTo(db.user, {foreignKey: 'seUsId', targetKey: 'usId'});
db.send.belongsTo(db.post, {foreignKey: 'sePoId', targetKey: 'poId'});

db.post.belongsTo(db.user, {foreignKey: 'poUsId', targetKey: 'usId'});

db.question.belongsTo(db.user, {foreignKey: 'quUsId', targetKey: 'usId'});
db.question.belongsTo(db.send, {foreignKey: 'quSeId', targetKey: 'seId'});
db.question.belongsTo(db.category, {foreignKey: 'quCaId', targetKey: 'caId'});

module.exports = db;
