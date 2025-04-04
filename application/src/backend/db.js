const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'database-team02.c87y00ue4gr3.us-east-1.rds.amazonaws.com',
    user: 'team02csc648',
    password: 'fo9EQ90DHgp590PRD5Lf',
    database: 'CSC_Test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
