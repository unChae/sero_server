// models
const model = require('../../models');
const Send = model.send;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_get_task']);
  let send = await Send.findAll();
  response(res, 200, "[web_get_task] success.", send);
};
    
