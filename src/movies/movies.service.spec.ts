import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService} from './movies.service';
import { NotFoundException } from '@nestjs/common';


describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile(); 

        service = module.get<MoviesService>(MoviesService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })
    
    describe('getAll', () => {
        it('should return a movie', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getOne', () => {
        it('should return one movie', () => {
            service.create({
                title: 'kyungmun movie',
                year : 2021,
                genres : ['action']
            });
            const movie = service.getOne(1);
            expect(movie).toBeDefined();
        })

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOne(999);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('deleteOne', () => {
        it('delete a movie', () => {
            service.create({
                title: 'kyungmun movie',
                year : 2021,
                genres : ['action']
            });
            const beforeDelete = service.getAll().length;
            service.deleteOne(1);
            const afterDelete = service.getAll().length;
            expect(afterDelete).toBeLessThan(beforeDelete);
        })

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOne(999);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    })

    describe('create a movie', () => {
        it('should create a movie', () => {
            const beforeCreate = service.getAll().length;
            service.create({
                title: 'kyungmun movie',
                year : 2021,
                genres : ['action']
            });
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    describe('update a movie', () => {
        it('should update a movie', () => {
            service.create({
                title: 'kyungmun movie',
                year : 2021,
                genres : ['action']
            });
            service.update(1, {title: 'update title'});
            const movie = service.getOne(1);
            expect(movie.title).toEqual('update title');
        });

        it('should throw a NotFoundException', () =>{
            try {
                service.update(999, {});
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });
});