const userApi = require('../api/app/user');
const postApi = require('../api/app/post');

const s3 = require("../api/util/util_upload");

module.exports = (router) => {
  // 인증번호 발송
  router.post('/app_fuc_sms', userApi.app_fuc_sms);
  // 인증번호 확인
  router.post('/app_chk_number', userApi.app_chk_number);
  // 회원가입
  router.post('/app_set_user', s3.upload.array('usPhoto'), userApi.app_set_user);
  // 로그인
  router.post('/app_fuc_login', userApi.app_fuc_login);
  // 토큰 체크
  router.post('/app_chk_token', userApi.app_chk_token);
  
  // 엽서 제작
  router.post('/app_set_post', s3.upload.fields([{name : 'poPhoto'}, {name : 'poContentPhoto'}, {name : 'poRecord'}]), postApi.app_set_post);
  // 받은 엽서 디자인
  router.post('/app_get_received', postApi.app_get_received);
  // 엽서 데이터 반환
  router.post('/app_get_post', postApi.app_get_post);
  return router;
};
