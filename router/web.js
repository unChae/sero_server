const api = require('../api/web');
const s3 = require("../api/util/util_upload");

module.exports = (router) => {
  // 로그인
  router.post('/web_fuc_login', api.web_fuc_login);
  // 인증번호 발송
  router.post('/web_fuc_sms', api.web_fuc_sms);
  // 인증번호 확인
  router.post('/web_chk_number', api.web_chk_number);
  // 회원가입
  router.post('/web_fuc_regist', s3.upload.array('usPhoto'), api.web_fuc_regist);
  // 토큰값 확인
  router.post('/web_chk_token', api.web_chk_token);
  // 소셜 로그인에서 회원가입 해야할지 말지
  router.post('/web_chk_registed', api.web_chk_registed);
  return router;
};
