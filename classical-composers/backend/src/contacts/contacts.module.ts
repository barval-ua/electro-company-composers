import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ContactsDatasource } from './contacts.datasource';
import { ContactsRepository } from './contacts.repository';
import { ContactsToken } from './contacts.token';

@Module({
    controllers: [ContactsController],
    providers: [
        ContactsService,
        {
            provide: ContactsToken.DATA_SOURCE_CONTACT,
            useValue: ContactsDatasource.CONTACTS,
        },
        ContactsRepository,
    ]
})
export class ContactsModule {}
