import { Injectable, NotFoundException, ConflictException, ParseUUIDPipe } from "@nestjs/common";
import { Sbl } from './entities/sbl.entity';
import { CreateSblDto } from "./dto/create.sbl.dto";
import { v4 as uuidv4} from 'uuid'

@Injectable()
export class SblService {
    private sbls : Sbl[] = [];

    getAll() : Sbl[] {
        return this.sbls;
    }

    getOne(id : string) : Sbl {
        const sbl = this.sbls.find(sbl => sbl.id == id);
        if (!sbl) {
            throw new NotFoundException(`Sbl with id ${id} not found`);
        }
        return sbl;
    }

    getOneByIP(ip : string): Sbl {
        const sbl = this.sbls.find(sbl => sbl.value === ip);
        if (!sbl) {
            throw new NotFoundException(`Sbl with id ${ip} not found`);
        }
        return sbl;
    }

    deleteOne(id : string) {
        this.getOne(id);
        this.sbls = this.sbls.filter(sbl => sbl.id !== id);
    }
   
    deleteOneByIP(ip : string) {
        this.getOneByIP(ip);
        this.sbls = this.sbls.filter(sbl => sbl.value !== ip);
    }
    

    create(sblData: CreateSblDto): Sbl{
        const sbl = this.sbls.find(sbl => sbl.value === sblData.value);
        if (sbl) {
            throw new ConflictException(`Sbl exists ip ${sblData.value}`);
        }
        
        let idValue = uuidv4();
        this.sbls.push({
            id: idValue,
            ...sblData,
        });
        //return Sbl sbl = Sbl.of(sblData)
        return {id : idValue, value : sblData.value, type : sblData.type, spec_version : sblData.spec_version};
    }
}
