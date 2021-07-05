
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateSblDto {
    @ApiProperty()
    @IsString()
    readonly value : string;

    @ApiProperty()
    @IsString()
    readonly type : string;

    @ApiProperty()
    @IsString()
    readonly spec_version : string;
}

/*
stix 2.1 format
{
    "type": "ipv4-addr",
    "spec_version": "2.1",
    "id": "ipv4-addr--ff26c055-6336-5bc5-b98d-13d6226742dd",
    "value": "198.51.100.3"
}
*/