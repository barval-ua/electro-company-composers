import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../datasource/base.repository';
import { Contact } from './contact.type';
import { ContactsToken } from './contacts.token';

@Injectable()
export class ContactsRepository extends BaseRepository<Contact> {
    @Inject(ContactsToken.DATA_SOURCE_CONTACT)
    protected readonly fileName: string;
}
