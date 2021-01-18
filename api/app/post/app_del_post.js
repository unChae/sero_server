// models
const model = require("../../../models");
const Post = model.post;
const Send = model.send;

// utils
const response = require("../../util/util_response");

module.exports = async (req,res) => {
  console.log(['app_del_post']);
  let {poId} = req.body;
  await Send.destroy({
    where : { sePoId : poId }
  })
  .catch((error) => {
    response(res, 500, '[app_del_post] server error.', error);
    return;
  });
  await Post.destroy({
    where : { poId }
  })
  .catch((error) => {
    response(res, 500, '[app_del_post] server error.', error);
    return;
  });
  response(res, 200, "[app_del_post] success.", null);
};