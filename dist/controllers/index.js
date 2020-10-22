"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const mongoose = require("mongoose");
const models_1 = require("./../models");
const Contact = mongoose.model("Contact", models_1.ContactSchema);
class ContactController {
    addContact(req, res) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.status(200).json({
                message: "Contact added!",
                contact: contact
            });
        });
    }
    //* Get contacts
    getContacts(req, res) {
        Contact.find({}, (err, document) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.status(200).json({
                message: "Contacts retrieved successfully",
                contacts: document
            });
        });
    }
    //* Get contact given ID
    getContactWithID(req, res) {
        Contact.findById(req.params.contactID, (err, document) => {
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
    updateContact(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true })
            .then(function (value) {
            res.status(200).json({
                message: "Contact update success",
                updatedCustomer: value
            });
        })
            .catch(function (reason) {
            return res.status(400).send(reason);
        });
    }
    //* Delete a contact
    deleteContact(req, res) {
        Contact.findByIdAndDelete(req.params.contactID, function (err, document) {
            if (err) {
                return res.status(400).send(err);
            }
            res.json({
                message: "Contact deleted successfully",
                deletedContact: document
            });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=index.js.map