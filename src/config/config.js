const mongoose = require('mongoose');

class Connection {

    databaseConnection() {
        try {
            const connect = mongoose.connect('mongodb://localhost:27017/greppy_company', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            if(!connect) console.log('connection failed');
            return connect;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Connection;