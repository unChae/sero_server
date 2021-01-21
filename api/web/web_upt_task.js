// models
const model = require('../../models');
const Send = model.send;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_upt_state']);
  let {taskState, taskId} = req.body;
  for(let i = 0; i < taskId.length; i++){
    await Send.update({
      seStatus: taskState,
    },{
      where: {seId: taskId[i]},
    })
    .catch(error => {
      response(res, 500, '[web_upt_state] server error.', error);
      return;
    });
  }
  response(res, 200, '[web_upt_state] success', null);
  return;
}

