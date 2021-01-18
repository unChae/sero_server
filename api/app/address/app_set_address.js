// models
const model = require("../../../models");
const Address = model.address;

// utils
const response = require("../../util/util_response");

module.exports = async (req,res) => {
  console.log(['app_set_address']);
  let {usId, adName, adAddress, adAddressDetail, adAddressNumber} = req.body;
    
  let overlap = await Address.findOne({
    where:{adName}
  })
  .catch(error => {
    response(res, 500, '[app_set_address] server error.', error);
    return;
  });
  if(overlap){
    response(res, 409, '[app_set_address] overlap address name.', null);
    return;
  }else{
    await Address.create({
      adUsId: usId,
      adName,
      adAddress,
      adAddressDetail,
      adAddressNumber,
    })
    .catch(error => {
      response(res, 500, '[app_set_address] server error.', error);
      return;
    });
    response(res, 200, '[app_set_address] success.', null);
  }
};