// httpプロトコルを利用した事をする際に使用するモジュール 例：http request, http server, http proxy 等...
const http = require('http');

// ファイルシステムを利用した事をする際に使用するモジュール htmlを返す、templateを使う 等....
const fs = require('fs');

const ejs = require('ejs');

// serverのip、ポートの値を記載している
const settings = require('./settings');

// httpモジュールにhttpサーバーモジュールを作成してもらう
const server = http.createServer();

// サーバーにリクエストが来た際の処理定義
// 参考：https://nodejs.org/api/http.html#http_http_createserver_requestlistener
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile(__dirname + '/public/index.html', 'utf-8', function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 not found!');
            return res.end();
        }

        // ブラウザはEOFが発されるまでコネクションを繋げている証明を
        res.writeHead(200, {'Content-Type': 'text/html'});
        let isFinish = false;
        setTimeout(() => {
            isFinish = true;
            res.end();
        }, 1000);

        const testFunc = () => {
            if (isFinish) return false;
            res.write(data);
            setTimeout(testFunc, 100);
        };
        testFunc();
    });
});

// サーバー起動
server.listen(settings.port, settings.host);
// 起動したと通知
console.log('server listening...');
