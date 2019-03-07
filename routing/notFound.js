const notFound = (data, db,callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];

    if(acceptableMethods.indexOf(data.method) > -1) {
        notFound[data.method](data, db, callback)
    } else {
        callback(400)
    }
};

notFound.get = (data, db, callback) => {
    callback(404, 'Required page not found!')
};

module.exports = notFound;