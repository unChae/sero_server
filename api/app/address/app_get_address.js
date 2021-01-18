// models
const model = require("../../../models");
const Address = model.address;

// utils
const response = require("../../util/util_response");

module.exports = async (req,res) => {
  console.log(['app_get_address']);
  let {usId} = req.body;
  let address = await Address.findAll({
    where : {adUsId: usId}
  })
  .catch(error => {
    response(res, 500, '[app_del_address] server error.', error);
    return;
  });
  response(res, 200, '[app_del_address] success.', address);
};