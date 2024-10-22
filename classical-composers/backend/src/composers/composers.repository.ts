import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../datasource/base.repository';
import { Composer } from './composer.type';
import { ComposersToken } from './composers.token';

@Injectable()
export class ComposersRepository extends BaseRepository<Composer> {
    @Inject(ComposersToken.DATA_SOURCE_MAIN)
    protected readonly fileName: string;
}
