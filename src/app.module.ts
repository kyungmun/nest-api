import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { SblModule } from './sbl/sbl.module';

@Module({
  imports: [MoviesModule, SblModule],
  controllers: [], //[MoviesController, SportsController],
  providers: [],
})
export class AppModule {}
