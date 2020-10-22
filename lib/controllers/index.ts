import * as mongoose from "mongoose";
import { ContactSchema } from "./../models";
import { Request, Response } from "express";

interface IContact extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: number;
}

const Contact = mongoose.model<IContact>("Contact", ContactSchema);

export class ContactController {
  public addContact(req: Request, res: Response) {
    let newContact: mongoose.Document = new Contact(req.body);

    newContact.save((err: any, contact: mongoose.Document) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({
        message: "Contact added!",
        contact: contact
      });
    })
  }

  //* Get contacts
  public getContacts(req: Request, res: Response) {
    Contact.find({}, (err: any, document: mongoose.Document) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({
        message: "Contacts retrieved successfully",
        contacts: document
      })
    });
  }

  //* Get contact given ID
  public getContactWithID(req: Request, res: Response) {
    Contact.findById(req.params.contactID, (err, document: mongoose.Document) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({
        message: "Contact retrieved successfully",
        contact: document
      });
    });
  }

  //* Update a contact
  public updateContact(req: Request, res: Response) {
    Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true })
      .then(function (value: IContact) {
        res.status(200).json({
          message: "Contact update success",
          updatedCustomer: value
        })
      })
      .catch(function (reason) {
        return res.status(400).send(reason)
      });
  }

  //* Delete a contact
  public deleteContact(req: Request, res: Response) {
    Contact.findByIdAndDelete(
      req.params.contactID,
      function (err, document) {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({ 
          message: "Contact deleted successfully",
          deletedContact: document
        })
      }
    )
  }
}