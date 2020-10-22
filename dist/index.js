"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster-one.dkbnl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
        this.MONGO_URL_DEV = "mongodb://localhost:27017/contactbook";
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }
    config() {
        //* support application/json type post data
        this.app.use(bodyParser.json());
        //* support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.MONGO_URL_DEV, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
            .then(value => { console.log("Connection to the db established!"); return value; })
            .catch(reason => {
            console.log("Failed to connect\n", reason);
        });
    }
    run() {
        this.app.listen(App.PORT, () => {
            this.mongoSetup();
            console.log(`Express server listening on port: ${App.PORT}`);
        });
    }
}
App.PORT = process.env.PORT || 20099;
var app = new App();
app.run();
//# sourceMappingURL=index.js.map