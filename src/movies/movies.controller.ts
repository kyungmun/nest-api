import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    name: 'x-timestemp',
    description: 'Custom header',
  })
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    @Get()
    getAllMovies(){
        return "All Movies object"
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
    @ApiOperation({ summary: 'Create Movie' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    create(@Body() movieData: string){
        console.log(movieData)
        return {movieData} // "This will create a Movie"
    }

    @Delete('/:id')
    delete(@Param('id') movieId: string){
        return `This Delete a Movie ID ${movieId}`
    }

    @Patch('/:id')
    petch(@Param('id') movieId: string, @Body() updateData: string){
        return {
            updateId : movieId,
            updateData
        }
    }
    
}
