// models
const model = require('../../../models');
const User = model.user;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_upt_alarm']);
  let {usId, usAlarm} = req.body;
  await User.update(
    {usAlarm},
    {
      where: {usId}
    },
  )
  .catch(error => {
    response(res, 500, '[app_upt_alarm] server error.', error);
    return;
  });
  response(res, 200, '[app_upt_alarm] success.', null);
};