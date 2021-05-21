import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { query } from 'express';

@Controller('movies')
export class MoviesController {
    @Get()
    getAllMoveis(){
        return "All Movies"
    }

    @Get('search')
    search(@Query("year") searchYear: string, @Query('title') searchTitle: string){
        return {
            year : searchYear,
            title : searchTitle
        }
    }

    @Get('/:id')
    getOne(@Param('id') movieId :string){
        return `This One Movie ID ${movieId}`
    }

    @Post()
    create(@Body() movieData: JSON){
        console.log(movieData)
        return "This will create a Movie"
    }

    @Delete('/:id')
    delete(@Param('id') movieId: string){
        return `This Delete a Movie ID ${movieId}`
    }

    @Patch('/:id')
    petch(@Param('id') movieId: string, @Body() updateData: JSON){
        return {
            updateId : movieId,
            ...
            updateData
        }
    }
    
}
