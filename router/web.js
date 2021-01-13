const api = require('../api/web');

module.exports = (router) => {
  // 로그인
  router.post('/web_fuc_login', api.web_fuc_login);
  // 인증번호 발송
  router.post('/web_fuc_sms', api.web_fuc_sms);
  // 인증번호 확인
  router.post('/web_chk_number', api.web_chk_number);
  // 회원가입
  router.post('/web_fuc_regist', api.web_fuc_regist);
  // 토큰값 확인
  router.post('/web_chk_token', api.web_chk_token);
  return router;
};
