import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create.movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
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
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(
        private readonly moviesService : MoviesService
    ){}

    @Get()
    getAllMovies() : Movie[]{
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query("year") searchYear: string, @Query('title') searchTitle: string){
        return {
            year : searchYear,
            title : searchTitle
        }
    }

    @Get('/:id')
    getOne(@Param('id') movieId :number): Movie{
        console.log(movieId)
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    @ApiOperation({ summary: 'Create Movie' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: String,
      })
    create(@Body() movieData: CreateMovieDto){
        console.log(movieData)
        return this.moviesService.create(movieData); // "This will create a Movie"
    }

    @Delete('/:id')
    delete(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    petch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(
            movieId,
            updateData
        );
    }
    
}
