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
    return;
  });
  if(certification) {
    if(ceNumber == certification.ceNumber){
      await Certification.destroy({
        where: {cePhoneNumber}
      })
      .catch(error => {
        response(res, 500, '[app_chk_number] server error.', error);
        return;
      })
      response(res, 200, '[app_chk_number] success.', true);
      return;
    }else{
      response(res, 409, '[app_chk_number] wrong authentication number.', false);
      return;
    }
  }else{
    response(res, 409, '[app_chk_number] unrequested phone number.', false);
    return;
  }
};
