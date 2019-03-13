const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.dataBase);

let db = {};


db.insert = (user, callback) => {
    const {id, name, password, mail} = user;
   pool.getConnection((err, connection) => {
       connection.query(`INSERT INTO users (id, name, password, mail, user_group) VALUES ("${id}","${name}","${password}","${mail}","guest")`,(err,data) => {
           if(!err) {
               callback(false, data);
               connection.release();
           }else{
               callback(true, err);
           }
       })
   })
};

db.updateUser = (set, value, id, callback) => {
    db.getById(id, (err, data) => {
        if(data.length > 0) {
            console.log(err, data);
            pool.getConnection((err, connection) => {
                connection.query(`UPDATE users SET ${set} = '${value}' WHERE id = '${id}'`, (err, data) => {
                    if(!err) {
                        callback(false, data);
                        connection.release();
                    } else callback(true, err);
                })
            })
        } else callback(true, 'User not found')
    })
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

db.getById = (id, callback) => {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM users WHERE id = "${id}"`, (err, data) => {
            if(!err) {
                callback(false, data);
                connection.release();
            } else {
                callback(true, err);
            }
        })
    })
};

db.deleteUser = (id, callback) => {
    pool.getConnection((err, connection) => {
        connection.query(`DELETE FROM users WHERE id = '${id}'`, (err, data) => {
            if(!err) {
                callback(false, data);
                connection.release();
            }else {
                callback(true, data);
            }
        });
    })
};

module.exports = db;