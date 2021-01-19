// models
const model = require('../../models');
const Send = model.send;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_del_task']);
  let {seId} = req.body;
  for(let i = 0; i < seId.length; i++){
    await Send.destroy({
      where: {seId: seId[i]},
    })
    .catch(error => {
      response(res, 500, '[web_del_task] server error.', error);
      return;
    });
  }
  response(res, 200, '[web_del_task] success', null);
  return;
}

