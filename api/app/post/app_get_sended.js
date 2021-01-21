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
      where: {sePoId: item.poId},
      include:[{
        model: Post,
      }],
    })
    if(_send) send.push(_send);
  }
  response(res, 200, "[app_get_sended] success.", send);
};