// httpプロトコルを利用した事をする際に使用するモジュール 例：http request, http server, http proxy 等...
const http = require('http');

// ファイルシステムを利用した事をする際に使用するモジュール htmlを返す、templateを使う 等....
const fs = require('fs');

// テンプレートエンジン
const ejs = require('ejs');

// serverのip、ポートの値を記載している
const settings = require('./settings');

// httpモジュールにhttpサーバーモジュールを作成してもらう
const server = http.createServer();

const qs = require('querystring');

// 読み込みファイル
const file = {
    // ルート
    index: {
        path: __dirname + '/public/bbs.ejs.html',
        code: 'utf-8',
    },
};
// 作ったテンプレートを読み込む
const template = fs.readFileSync(file.index.path, file.index.code);

let posts = [];

function renderForm(posts, res) {
    const data = ejs.render(template, {
        posts: posts,
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
}
// サーバーにリクエストが来た際の処理定義
// 参考：https://nodejs.org/api/http.html#http_http_createserver_requestlistener
server.on('request', function (req, res) {
    if (req.url === '/favicon.ico') return true;

    if (req.method === 'POST') {
        req.data = '';
        req.on('readable', function () {
            req.data += req.read() || '';
        });
        req.on('end', () => {
            const query = qs.parse(req.data);
            console.log(query);
            posts.push(query.name);
            renderForm(posts, res);
        });
    } else {
        renderForm(posts, res);
    }
});

// サーバー起動
server.listen(settings.port, settings.host);
// 起動したと通知
console.log('IP: ' + settings.host + ':' + settings.port);
console.log('server listening...');
