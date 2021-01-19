// models
const model = require('../../../models');
const User = model.user;
const Post = model.post;
const Send = model.send;
const Address = model.address;
const Question = model.question;

// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_del_user']);
  let {usId} = req.body;
  await Send.destroy({
    where : {seUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_del_user] server error.', error);
    return;
  });
  await Question.destroy({
    where : {quUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_del_user] server error.', error);
    return;
  });
  await Address.destroy({
    where : {adUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_del_user] server error.', error);
    return;
  });
  await Post.destroy({
    where : {poUsId: usId},
  })
  .catch(error => {
    response(res, 500, '[app_del_user] server error.', error);
    return;
  });
  await User.destroy({
    where : {usId}
  })
  .catch(error => {
    response(res, 500, '[app_del_user] server error.', error);
    return;
  });
  response(res, 200, '[app_del_user] success.', null);
  return;
};