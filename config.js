/*
* Create and export configuration varibles
*
*
*/

let config = {
    dataBase: {
        host : 'localhost',
        user:'root',
        password:'',
        database: 'hotel',
        queueLimit : 0, // unlimited queueing
        connectionLimit : 0 // unlimited connections
    }
};

// Export the module
module.exports = config;