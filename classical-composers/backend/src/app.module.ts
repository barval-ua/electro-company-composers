import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComposersModule } from './composers/composers.module';

@Module({
    imports: [ComposersModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
