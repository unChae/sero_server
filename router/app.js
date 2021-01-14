const api = require('../api/app/user');
const s3 = require("../api/util/util_upload");

module.exports = (router) => {
  // 인증번호 발송
  router.post('/app_fuc_sms', api.app_fuc_sms);
  // 인증번호 확인
  router.post('/app_chk_number', api.app_chk_number);
  // 회원가입
  router.post('/app_set_user', s3.upload.array('usPhoto'), api.app_set_user);
  return router;
};
