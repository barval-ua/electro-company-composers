import { Module } from '@nestjs/common';
import { ComposersService } from './composers.service';
import { ComposersController } from './composers.controller';
import { ComposersDatasource } from './composers.datasource';
import { ComposersRepository } from './composers.repository';
import { ComposersToken } from './composers.token';

@Module({
    controllers: [ComposersController],
    providers: [
        ComposersService,
        {
            provide: ComposersToken.DATA_SOURCE_MAIN,
            useValue: ComposersDatasource.COMPOSERS,
        },
        ComposersRepository,
    ]
})
export class ComposersModule {}
