const helpers = require('../utils/helpers');

const users = (data, db, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];

    if(acceptableMethods.indexOf(data.method) > -1) {
        users[data.method](data, db, callback)
    } else {
        callback(400)
    }
};

users.post = ({payload}, db, callback) => {
   const {name, mail, password} = payload;
   const userName = typeof (name) === 'string' && name.length > 5 ? name : false;
   const userPassword = typeof (password) === 'string' && password.length > 7 ? password : false;
   const userMail = typeof (mail) === 'string' ? mail : false;

   if(userName && userPassword && userMail) {
       const user = {
           id: helpers.randomStr(25),
           name: userName,
           mail: userMail,
           password: userPassword
       };
       db.insert(user, (err, data) => {
           if(!err) {
               callback(200,data);
           }else {
               callback(400, data);
               console.log(err);
           }
       });
   } else {
       callback(400, {error: 'Missing required fields!'});
   }
};

users.get = (data, db, callback) => {
    if(Object.keys(data.queryStringObject).length === 0) {
        db.getAll('users', (err, data) => {
            if(!err) {
                callback(200, {data});
            }
        });
    } else if (data.queryStringObject.id){
        db.getById(data.queryStringObject.id, (err, data) => {
            if(!err) {
                callback(200, {data: data[0]});
            }
            else
            {
                console.log(err,data);
            }
        });
    } else {
        callback(400, {message: 'UNKNOWN ERROR!'});
    }

};

users.put = (data, callback) => {
    callback(200, {message: 'Auth required for put!'});
};

users.delete = (data, db, callback) => {
    const userId = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.length === 25 ? data.queryStringObject.id : false;

    if(userId) {
        db.getById(userId, (err, data) => {
            if (!err && data.length > 0) {
                db.deleteUser(userId, (err, data) => {
                    if(!err) callback(200, data);
                    else callback(400, {'error': `${userId} not found`})
                });
            } else callback(400, {'error': 'Required user not found!'})
        });
    } else {
        callback(400, {'error': 'Missing required fields'});
    }
};

module.exports = users;