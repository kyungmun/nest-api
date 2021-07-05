import { Test, TestingModule } from '@nestjs/testing';
import { SblService} from './sbl.service';
import { ConflictException, NotFoundException } from '@nestjs/common';


describe('SblService', () => {
    let service: SblService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SblService],
        }).compile(); 

        service = module.get<SblService>(SblService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return sbl', () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array)
        });
    });

    describe('getOne', () => {
        it('should getOne Sbl', () => {
            const sbl = service.create({
                value : '1.1.1.1',
                type : 'ipv4-addr',
                spec_version: '2.1'
            });
            const result = service.getOne(sbl.id);
            expect(result).toBeDefined();
        })

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOneByIP('2.2.2.2');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    })

    describe('getOneByIP', () => {
        it('should getOneByIP Sbl', () => {
            const sbl = service.create({
                value : '1.1.1.1',
                type : 'ipv4-addr',
                spec_version: '2.1'
            });
            const result = service.getOneByIP(sbl.value);
            expect(result).toBeDefined();
        })

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOneByIP('2.2.2.2');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    })

    describe('deleteOne', () => {
        it('should deleteOne Sbl', () => {
            const sbl = service.create({
                value : '1.1.1.1',
                type : 'ipv4-addr',
                spec_version: '2.1'
            });
            const beforeDelete = service.getAll().length;
            const result = service.deleteOne(sbl.id);
            const afterDelete = service.getAll().length;
            expect(afterDelete).toBeLessThan(beforeDelete);
        })

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOne('1');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    })

    describe('deleteOneByIP sbl ip', () => {
        it('should sbl delete', () => {
            service.create({
                value : '1.1.1.1',
                type : 'ipv4-addr',
                spec_version : '2.1'
            });
            const beforeDelete = service.getAll().length;
            service.deleteOneByIP('1.1.1.1');
            const afterDelete = service.getAll().length;
            expect(afterDelete).toBeLessThan(beforeDelete);
        });

        it('should thorw 404 NotFoundException', () => {
            try {
                service.getOne('1.1.1.1');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('create a sbl', () => {
        it('should create a sbl', () => {
            const beforeCreate = service.getAll().length;
            const result = service.create({
                value: '1.1.1.1',
                type : 'ipv4-addr',
                spec_version : '2.1'
            });
            console.log(result);
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);

            const result2 = service.getOne(result.id);
            expect(result.id).toEqual(result2.id);
        });

        it('should throw ConflictException', () => {
            service.create({
                value: '1.1.1.1',
                type : 'ipv4-addr',
                spec_version : '2.1'
            });

            try {
                service.create({
                    value: '1.1.1.1',
                    type : 'ipv4-addr',
                    spec_version : '2.1'
                });
            } catch (e) {
                expect(e).toBeInstanceOf(ConflictException);
            }
        });
    });


});