// models
const model = require("../../../models");
const Send = model.send;
const User = model.user;

// utils
const response = require("../../util/util_response");
const sms = require('../../util/util_sms');
const fcm = require("../../util/util_notify");

module.exports = async (req,res) => {
  console.log(['app_fuc_send']);
  let {poId, seName, seAddress, seAddressDetail, seAddressNumber, usPhoneNumber} = req.body;
  if(!usPhoneNumber){
    // offline send
    await Send.create({
        sePoId: poId,
        seUsId: null,
        seName,
        seAddress,
        seAddressDetail,
        seAddressNumber,
    })
    .catch(error => {
      response(res, 500, '[app_fuc_send] server error.', error);
      return;
    });
  }else{
    // online send
    let user = await User.findOne({
      raw: true,
      where: {usPhoneNumber},
    })
    .catch(error => {
      response(res, 500, '[app_fuc_send] server error.', error);
      return;
    });
    if(user){
      // user exist
      await Send.create({
        sePoId: poId,
        seUsId: user.usId,
        seName: user.usName,
        sePhoneNumber: usPhoneNumber,
        seAddress: user.usAddress,
        seAddressDetail: user.usAddressDetail,
        seAddressNumber: user.usAddressNumber,
      })
      .catch(error => {
        response(res, 500, '[app_fuc_send] server error.', error);
        return;
      });
      if(user.usFcmToken != null){
        await fcm.send(user.usFcmToken)
        .catch(error => {
        response(res, 500, '[app_fuc_send] server error.', error);
        return;
        });
      }
    }else{
      // none user
      let send = await Send.create({
        sePoId: poId,
        sePhoneNumber: usPhoneNumber,
      })
      .catch(error => {
        response(res, 500, '[app_fuc_send] server error.', error);
        return;
      });
      await sms.setData(usPhoneNumber, '엽서가 도착했습니다.\n사이트에 주소를 입력해주시면 엽서가 전송됩니다.\nhttps://seropost.com/' + send.seId);
      await sms.sendData();
    }
  }
  response(res, 200, "[app_fuc_send] success.", null);
};