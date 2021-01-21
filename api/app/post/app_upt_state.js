// models
const model = require("../../../models");
const Send = model.send;

// utils
const response = require("../../util/util_response");

module.exports = async (req,res) => {
  console.log(['app_upt_state'])
  let {seId} = req.body;
  await Send.update({
    seStatus: 1,
  },{
    where: {seId},
  })
  response(res, 200, "[app_get_sended] success.", null);
};