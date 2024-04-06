import {promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
  }
  
  async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts.find((contact) => contact.id === contactId) || null;
    } catch (error) {
        console.log(error);
    }
  }
  
  async function removeContact(contactId) {
    try {
       const data = await fs.readFile(contactsPath);
       const contacts = JSON.parse(data);
       const deletedContact = contacts.find((contact) => contact.id === contactId);
       if (!deletedContact) {
        return null;
       } 
       const updatedContacts = contacts.filter((contact) => contact.id !== deletedContact.id);
       await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
       return deletedContact;
    } catch (error) {
        console.log(error);
    }
  }
  
  async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContact = {id: nanoid(), name, email, phone};
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
    } catch (error) {
        console.log(error);
    }
  }
  

  export {listContacts, getContactById, removeContact, addContact};
  