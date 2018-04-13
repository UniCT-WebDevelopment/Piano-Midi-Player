const mysql = require('mysql');

module.exports =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ciao',
        database:'music_db',
        connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true
    });