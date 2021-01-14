// models
const model = require('../../../models');
const Certification = model.certification;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log('[app_chk_number]');
  let {cePhoneNumber, ceNumber} = req.body;
  let certification = await Certification.findOne({
    raw: true, 
    where: {cePhoneNumber}
  })
  .catch(error => {
    response(res, 500, '[app_chk_number] server error.', error);
  });
  if(certification) {
    if(ceNumber == certification.ceNumber){
      await Certification.destroy({
        where: {cePhoneNumber}
      })
      .catch(error => {
        response(res, 500, '[app_chk_number] server error.', error);
      })
      response(res, 200, '[app_chk_number] success.', true);
    }else{
      response(res, 409, '[app_chk_number] wrong authentication number.', false);
    }
  }else{
    response(res, 409, '[app_chk_number] unrequested phone number.', false);
  }
};
