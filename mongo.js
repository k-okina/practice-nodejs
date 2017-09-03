const MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');

MongoClient.connect('mongodb://' + settings.host + '/' + settings.db, function (err, db) {
    if (err) return console.dir(err);
    console.log('connected to db');
    db.collection('users', function (err, collection) {
        const docs = [
            {name: 'taguchi', score: '40'},
            {name: 'hoge', score: '60'},
            {name: 'ono', score: '99'}
        ];

        // オブジェクトを挿入
        collection.insert(docs, function (err, result) {
            console.dir(result);
        });

        // オブジェクトを次々と取得
        const stream = collection.find().stream();
        stream.on('data', (item) => {
            console.log(item);
        });
        stream.on('end', function () {
            console.log('finished.');
        });
    });
});
