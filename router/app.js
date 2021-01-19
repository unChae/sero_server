const userApi = require('../api/app/user');
const postApi = require('../api/app/post');
const addressApi = require('../api/app/address');
const questionApi = require('../api/app/question');

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
  // 회원 탈퇴
  router.post('/app_del_user', userApi.app_del_user);
  // 알람 상태 변경
  router.post('/app_upt_alarm', userApi.app_upt_alarm);
  // 유저 정보 변경
  router.post('/app_upt_user', userApi.app_upt_user);
  
  // 엽서 제작
  router.post('/app_set_post', s3.upload.fields([{name : 'poPhoto'}, {name : 'poContentPhoto'}, {name : 'poRecord'}]), postApi.app_set_post);
  // 받은 엽서 디자인
  router.post('/app_get_received', postApi.app_get_received);
  // 엽서 데이터 반환
  router.post('/app_get_post', postApi.app_get_post);
  // 엽서 삭제
  router.post('/app_del_post', postApi.app_del_post);
  // 전송한 엽서 조회
  router.post('/app_get_sended', postApi.app_get_sended);
  // 보낸 받은 엽서 갯 수
  router.post('/app_get_count', postApi.app_get_count);
  // 엽서 전송
  router.post('/app_fuc_send', postApi.app_fuc_send);
  
  // 주소 삭제
  router.post('/app_del_address', addressApi.app_del_address);
  // 주소 등록
  router.post('/app_get_address', addressApi.app_get_address);
  // 주소 데이터 반환
  router.post('/app_set_address', addressApi.app_set_address);

  // 문의 작성
  router.post('/app_get_question', questionApi.app_get_question);
  // 문의 삭제
  router.post('/app_del_question', questionApi.app_del_question);
  // 문의 데이터 반환
  router.post('/app_set_question', questionApi.app_set_question);
  // 카테고리 데이터 반환
  router.post('/app_get_category', questionApi.app_get_category);
  return router;
};
