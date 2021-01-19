// models
const model = require('../../models');
const Certification = model.certification;

// utils
const response = require('../util/util_response');
const sms = require('../util/util_sms');
const random = require('../util/util_random');

module.exports = async (req, res) => {
  console.log(['web_fuc_sms']);
  let {cePhoneNumber} = req.body;
  let randomNumber = random.number(1000,9999);
  sms.setData(cePhoneNumber, randomNumber);
  let sended = await sms.sendData();
  if(sended){
    let certification = await Certification.findOne({
      raw: true, 
      where: {cePhoneNumber}
    })
    .catch((error) => {
      response(res, 500, '[web_fuc_sms] server error.', error);
      return;
    });
    if(certification){
      await Certification.update({
        number: randomNumber,
      },{
        where: {cePhoneNumber}
      });
    }else{
      await Certification.create({
        cePhoneNumber,
        ceNumber: randomNumber,
      });
    }
    response(res, 200, "[web_fuc_sms] sended sms.", randomNumber);
    return;
  }else{
    response(res, 500, '[web_fuc_sms] server error.', null);
    return;
  }
};
    