// modules
const axios = require('axios');

const url = process.env.ALIGOAPI_URL;
var payload = {
    key : process.env.ALIGOAPI_KEY,
    id : process.env.ALIGOAPI_ID,
    sender : process.env.ALIGOAPI_SENDER,
    receiver :'',
    msg : '',
};

module.exports = {
  setData: (cePhoneNumber, randomNumber) => {
    payload.receiver = cePhoneNumber;
    payload.msg = String(randomNumber);
  },
  sendData: () => {
    axios.post(url, null, {
      params: {
        key: payload.key,
        user_id: payload.id,
        sender: payload.sender,
        receiver: payload.receiver,
        msg: payload.msg
      }
    }).catch((err) => {
      return false;
    })
    return true;
  },
}
