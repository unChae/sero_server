var FCM = require('fcm-node');

var serverKey = process.env.FIRE_BASE_SERVICE_KEY; 
var fcm = new FCM(serverKey);

var message = {
  to: 'registration_token',
  notification: {
    title: '세로엽서',
    body: '엽서가 도착했습니다',
  },
};

module.exports = {
  send : (usFcmToken) => {
    return new Promise(function(resolve, reject){
      message.to = usFcmToken;
      fcm.send(message, function(err, res){
        if (err) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
  },
};
