// models
const model = require('../../../models');
const Post = model.post;
const Send = model.send;
const User = model.user;
// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_get_received']);
  let {usId} = req.body;
  let send = await Send.findAll({
    where: {'seUsId': usId},
    include:[{
      model: Post,
      include:[{
        model: User,
      }],
    }],
    order: [['createdAt', 'DESC']]
  })
  .catch(error => {
    response(res, 500, '[app_get_received] server error.', error);
    return;
  });
  response(res, 200, '[app_get_received] success.', send);
  return;
}