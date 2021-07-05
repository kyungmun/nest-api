import { Module } from '@nestjs/common';
import { SblController } from './sbl.controller';
import { SblService } from './sbl.service';


@Module({
    controllers: [SblController],
    providers: [SblService],
})

export class SblModule {}