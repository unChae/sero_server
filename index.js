/* 모듈 호출 */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* 데이터베이스 연결 */
const models = require('./models/index.js');

models.sequelize.sync().then( () => {
	console.log('DB connect');
}).catch(err => {
	console.log('DB connect fail');
	console.log(err);
});

/* 서버 구동 */
const fs = require('fs');
const http = require('http');
const https = require('https');

// // 인증서 호출
const privateKey = fs.readFileSync('/etc/letsencrypt/live/dev.seropost.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/dev.seropost.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dev.seropost.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

/* 모듈 설정 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
require('dotenv').config();

/* 라우팅 */
const router = express.Router();

const appRouter = require('./router/app')(router);
app.use('/app', appRouter);

const webRouter = require('./router/web')(router);
app.use('/web', webRouter);

// DEFALUT
app.get('/', (req, res) => {
    let response_data = {
        status: 200,
        message: 'Hello world!',
        data: null
    };
    res.status(200).json(response_data);
});