import { Injectable } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';

@Injectable()
export class ContactsService {
    constructor(private readonly contactsRepo: ContactsRepository){}

    getContact(id: number) {
        return this.contactsRepo.findOne((contact) => contact.id === id);
    }
}
