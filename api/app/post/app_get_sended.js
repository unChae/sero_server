// models
const model = require("../../../models");
const Send = model.send;
const Post = model.post;

// utils
const response = require("../../util/util_response");

module.exports = async (req,res) => {
  console.log(['app_get_sended'])
  let {usId} = req.body;
  let post = await Post.findAll({
    raw: true,
    where: {poUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_get_sended] server error.', error);
    return;
  });
  let send = [];
  for(let item of post){
    let _send = await Send.findOne({
      raw: true,
      where: {sePoId: item.poId},
    })
    if(_send) send.push(_send);
  }
  for(let item of send){
    item.post = await Post.findOne({
      where : {poId: item.sePoId}
    })
    .catch(error => {
      response(res, 500, '[app_get_sended] server error.', error);
      return;
    });
  }
  response(res, 200, "[app_get_sended] success.", send);
};