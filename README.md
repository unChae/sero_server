# seropost

- language
    - nodejs
    
### API setting

```
ROOT_URL: dev.seropost.com

fuc 이외 함수
chk 체크
upt 데이터 업데이트
get 데이터 반환
set 데이터 입력
del 데이터 삭제
```
- api/web
    - ~~[web_fuc_login]로그인~~
        - `자체로그인 [usSocialValue, usPhoneNumber, usPassword]`
        - `소셜로그인 [usSocialValue, usSocialId]`
    - ~~[web_fuc_sms]메세지 전송~~
        - `[cePhoneNumber]`
    - ~~[web_chk_number]인증 코드 확인~~
        - `[cePhoneNumber, ceNumber]`
    - ~~[web_fuc_regist]회원가입~~
        - `자체로그인 [usSocialValue, usPhoneNumber, usName, usPhoto, usAddress, usAddressDetail, usAddressNumber, usPassword]`
        - `소셜로그인 [usSocialValue, usPhoneNumber, usName, usPhoto, usAddress, usAddressDetail, usAddressNumber, usSocialId]`
    - ~~[web_chk_token]토큰체크~~
        - `[usJwtToken, usId]`
    - ~~[web_get_task]task 정보 반환~~
        - `[searchText(String), target(int), taskState(array)]` 
    - [web_upt_state]state 변경
        - `` 
    - [web_del_task]task 정보 삭제
        - `[seId(array)]`
    - [web_get_qrcode]qr데이터 반환
    
- api/app
  - **유저**
    - ~~[app_set_user]유저 정보 생성~~
    - ~~[app_get_user]유저 정보 반환~~
    - ~~[app_upt_user]유저 정보 변경~~
    - ~~[app_del_user]유저 정보 삭제~~
    - ~~[app_upt_alarm]알람정보 변경~~
    - ~~[app_fuc_sms]메세지 전송~~
    - ~~[app_chk_number]인증 코드 확인~~
  - **문의사항**
    - ~~[app_get_category]문의 카테고리 가져오기~~
    - ~~[app_set_question]문의 생성~~
    - ~~[app_del_question]문의 삭제~~
    - ~~[app_get_question]문의 반환~~
  - **엽서**
    - ~~[app_get_count]엽서 갯 수 반환~~ **미처리**
    - ~~[app_set_post]엽서 생성~~
    - ~~[app_del_post]엽서 삭제~~
    - ~~[app_get_post]엽서 데이터 반환~~
    - ~~[app_get_received]받은 엽서 리스트 반환~~
    - ~~[app_get_sended]전송한 엽서 리스트 반환~~
    - ~~[app_fuc_send]엽서 전송~~
    - [app_upt_status]전송 된 엽서 상태 변경
  - **주소**
    - ~~[app_get_address]주소 반환~~
    - ~~[app_del_address]주소 삭제~~
    - ~~[app_set_address]주소 등록~~
    
- api/util
    - ~~[util_response]데이터 반환~~
    - ~~[util_hash]해시 값 처리~~
    - ~~[util_random]랜덤 값 생성~~
    - ~~[util_upload]이미지 업로드~~
    - ~~[util_sms]문자 전송~~
    - ~~[util_token]토큰 생성~~
    - ~~[util_notify]fcm 알림 전송~~