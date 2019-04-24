const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    constructor(host) {
        this.host = host;
        this.db = undefined;
        this.dbo = null;
    }

    async connect() {
        await MongoClient.connect(`mongodb://${this.host}`,  { useNewUrlParser: true })
            .then(database => {
                this.db = database;
                this.dbo =  database.db('node-mongo');
            })
            .catch(err => {
                console.error('Error to connect data base;')
            });
    }

    createSession(token) {
        this.dbo.collection('session').insertOne({name: 'Sanek'})
            .then((data) => {
                console.log(data.ops);
                this.db.close();
            })
            .catch(err => console.log(err));
    }

    getSession(token) {

    }

    async createUser (name, password, email) {
        let error;
        let hasError = false;

        const res = await this.dbo.collection('users').insertOne({name, password, email})
         .catch(err => {
             hasError = true;
             if(err.code === 11000) {
                 error = {error: 'This mail all ready taken!'};
             }
         });

         this.db.close();
         if(hasError) {
             return error;
         } else {
             return res.ops[0];
         }
    }

    async findOne (collection, fields) {
        const result = await this.dbo.collection(collection).findOne(fields);
        this.db.close();
        if(result !== null) {
            return result;
        } else {
            return {error: 'User not found!'}
        }
    }
}

module.exports = MongoDB;