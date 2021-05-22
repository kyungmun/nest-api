import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('movies')
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
    @ApiOperation({ summary: 'Create Movie' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    create(@Body() movieData: string){
        console.log(movieData)
        return {movieData} // "This will create a Movie"
    }

    private newMethod() {
        return 'Create Movie';
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
