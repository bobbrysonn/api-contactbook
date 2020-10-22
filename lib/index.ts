import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";

import { Routes } from "./routes";

class App {
  static PORT = process.env.PORT || 20099;
  private app: express.Application;
  private routePrv: Routes = new Routes();
  private MONGO_URL: string =
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster-one.dkbnl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
  private MONGO_URL_DEV: string = "mongodb://localhost:27017/contactbook";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    //* support application/json type post data
    this.app.use(bodyParser.json());
    //* support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(
      this.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
      .then(value => { console.log("Connection to the db established!"); return value })
      .catch(reason => {
        console.log("Failed to connect\n", reason);
      });
  }

  public run(): void {
    this.app.listen(App.PORT, () => {
      this.mongoSetup();
      console.log(`Express server listening on port: ${App.PORT}`);
    });
  }
}

var app: App = new App();
app.run();
