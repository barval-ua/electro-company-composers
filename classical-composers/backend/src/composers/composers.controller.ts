import { Controller, Get } from '@nestjs/common';
import { ComposersService } from './composers.service';
import { Composer } from './composer.type';

@Controller('/composers')
export class ComposersController {
    constructor(private readonly composersService: ComposersService) {}

    @Get()
    async getAll(): Promise<Composer[]> {
        return this.composersService.getComposers();
    }
}
