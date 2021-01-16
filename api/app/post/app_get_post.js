// models
const model = require('../../../models');
const Post = model.post;

// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_get_post']);
  let {usId} = req.body;
  let post = await Post.findAll({
    where: {'poUsId': usId},
    order: [['createdAt', 'DESC']]
  })
  .catch(error => {
    response(res, 500, '[app_get_post] server error.', error);
    return;
  });
  response(res, 200, '[app_get_post] success', post);
  return;
}