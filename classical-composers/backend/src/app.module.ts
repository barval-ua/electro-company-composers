import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComposersModule } from './composers/composers.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
    imports: [ComposersModule, ContactsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
