const main = (data, callback) => {
    const acceptableMethods = ['POST', 'GET', 'PUT', 'DELETE'];

    if(acceptableMethods.indexOf(data.method) > -1) {
            callback(200, {'mes': 'hello!'})
    } else {
        callback(400)
    }
};

module.exports = main;