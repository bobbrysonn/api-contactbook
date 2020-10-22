"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const controllers_1 = require("./../controllers/");
class Routes {
    constructor() {
        this.contactController = new controllers_1.ContactController();
    }
    routes(app) {
        app.route("/")
            .get((req, res) => {
            res.status(200).json({
                message: "GET request successful!!"
            });
        });
        //* Contact
        app.route("/contact")
            //* GET endpoint
            .get(this.contactController.getContacts)
            //* POST endpoint
            .post(this.contactController.addContact);
        //* Contact detail
        app.route("/contact/:contactID")
            //* get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map