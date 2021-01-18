// models
const model = require("../../../models");
const Send = model.send;
const Post = model.post;

// utils
const response = require("../../util/util_response");

module.exports = async (req, res) =>{
  console.log(['app_get_count']);
  let {usId} = req.body;
  // sended post count
  let sended = Send.findAndCountAll({
    include: [{
      model: Post,
      where: {poUsId: usId}
    }]
  })
  .catch(error => {
    response(res, 500, '[app_get_count] server error.', error);
    return;
  });
  // received post count
  let received = await Send.findAndCountAll({
    where:{seUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_get_count] server error.', error);
    return;
  });
  let count = {
    "sendedPost": sended.length,
    "receivedPost": received.count,
  }
  response(res, 200,"[app_get_count] success.", count);
};
