const users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];

    if(acceptableMethods.indexOf(data.method) > -1) {
        users[data.method](data, callback)
    } else {
        callback(400)
    }
};

users.post = (data, callback) => {
    callback(200, {message: 'Auth required for post!'});
};

users.get = (data, callback) => {
    callback(200, {message: 'Auth required for get!'});
};

users.put = (data, callback) => {
    callback(200, {message: 'Auth required for put!'});
};

users.delete = (data, callback) => {
    callback(200, {message: 'Auth required for post!'});
};

module.exports = users;