import { Request, Response, Application } from "express";
import { ContactController } from "./../controllers/";

export class Routes {
  public contactController: ContactController = new ContactController();
  public routes(app: Application): void {
    app.route("/")
      .get((req: Request, res: Response) => {
        res.status(200).json({ 
          message: "GET request successful!!"
        })
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