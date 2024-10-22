import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.type';

@Controller('/contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
        const contact = await this.contactsService.getContact(id);
        if (!contact) {
            throw new NotFoundException(`Contact #${id} not found`);
        }
        return contact;
    }
}
