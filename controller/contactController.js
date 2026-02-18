import express from 'express'
import { Contact } from '../model/Contact.js';

// API - /api/contact/save
export const save = async (req, res) => {
    const { name, email, mobile, bloodgroup } = req.body;
    const user = req.body;
    if (name == "" || email == "" || mobile == "" || bloodgroup == "") {
        res.json({ message: 'All field required', status: false })
    } else {
        let checkData = await Contact.findOne({ email })
        if (!checkData) {
            let contact = await Contact.create({
                name, email, mobile, bloodgroup
            });
            return res.json({ message: 'Contact Save Successfully', status: true, user })
        } else {
            return res.json({ message: 'Contact Already Exist', status: false })
        }
    }
    console.log(user);
}

// API - /api/contact/getAllContact
export const getContact = async (req, res) => {
    let contacts = await Contact.find();

    if (!contacts) {
        res.json({ message: "Not Contact Available", status: false })
    } else {
        res.json({ message: "All Contact Fetched", contacts, status: true })
    }
}

// API - /api/contact/getContactById
export const getContactById = async (req, res) => {
    let id = req.params.id;
    let contacts = await Contact.findById({ _id: id });

    if (!contacts) {
        res.json({ message: "No Contact Found", status: false })
    } else {
        res.json({ message: "Data Fetched Successfully", contacts, status: true })
    }
}

// API - /api/contact/update/id
export const updateById = async (req, res) => {
    let id = req.params.id;
    const { name, email, mobile, bloodgroup } = req.body;
    let updateContacts = await Contact.findByIdAndUpdate(id,
        { name, email, mobile, bloodgroup },
        { new: true });

    if (updateContacts) {
        res.json({ message: "Contact Updated Successfully", status: true })
    } else {
        res.json({ message: "New Contact Inserted", status: true })
    }
}
// API - /api/contact/delete/id
export const deleteById = async (req, res) => {
    let id = req.params.id;
    let deleteContacts = await Contact.findByIdAndDelete(id);

    if (deleteContacts) {
        res.json({ message: "Contact deleted Successfully", status: true })
    } else {
        res.json({ message: "Contact not deleted", status: false })
    }
}