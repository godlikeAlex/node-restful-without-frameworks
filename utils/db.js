const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.dataBase);

let db = {};

db.insert = () => {
    return null;
};

db.getAll = (table, callback) => {
    pool.getConnection((err,connection)=>{
        connection.query(`select * from ${table}`,(err,data)=>{
            if(!err){
                callback(false,data);
                connection.release();
            }else{
                callback(true, data);
            }
        });
    });
};

module.exports = db;