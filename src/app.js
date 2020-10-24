const bodyParser = require('body-parser');
const router = require('./route/index');

class App {
    constructor(app, port) {
        this.app = app;
        this.port = port;
    }

    run() {

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(router);
        
        return this.app.listen(this.port, () => {
            try {
                console.log(`server is running on ${this.port} ...🚀`);
            } catch (error) {
                throw error;
            }
        });
    }
}

module.exports = App;