import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    // this.axios.(
    //   'https://pokeapi.co/api/v2/pokemon?limit=200',
    // );
    return this.seedService.populate();
  }
}
