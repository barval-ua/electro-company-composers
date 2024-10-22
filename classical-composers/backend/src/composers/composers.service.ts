import { Injectable } from '@nestjs/common';
import { ComposersRepository } from './composers.repository';

@Injectable()
export class ComposersService {
    constructor(private readonly composersRepo: ComposersRepository){}

    getComposers() {
        return this.composersRepo.findAll();
    }
}
