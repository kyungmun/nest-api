import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { SblService } from './sbl.service';
import { CreateSblDto } from './dto/create.sbl.dto';
import { Sbl } from './entities/sbl.entity';


@ApiBearerAuth()
@ApiHeader({
    name: 'x-access-key',
    description: 'Custom header'
  })
@ApiHeader({
    name: 'x-signature',
    description: 'Custom header'
  })
  @ApiHeader({
    name: 'x-timestamp',
    description: 'Custom header',
  })
@ApiTags('Sbls')
@Controller('policy/sbl')
export class SblController {

    constructor(
        private readonly sblService : SblService
    ){}

    @Get()
    getAllSbl(){
        return this.sblService.getAll()
    }

    @Get('search')
    search(@Query("ip") ipValue: string, @Query('ver') verType: string){
        return {
            ip : ipValue,
            ver : verType
        }
    }

    @Get('/:id')
    getOne(@Param('id') id :string){
        return this.sblService.getOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create SBL' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: String,
      })
    create(@Body() sblData: CreateSblDto){
        console.log(sblData) 
        const result = this.sblService.create(sblData) // "This will create a sbl result"
        console.log(result);
        return result;
    }

    @Delete('/:ip')
    delete(@Param('ip') sblIp: string){
        return this.sblService.deleteOneByIP(sblIp)
    }


    
}
