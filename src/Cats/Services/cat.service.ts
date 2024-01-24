import { CreateCatDto } from "../dto/cat.create.dto";
import { UpdateCatDto } from "../dto/cat.update.dto";
import { ICatService } from "./Interfaces/cat.service.interface";

export class CatService implements ICatService {
    constructor(){}

    create(createCatDto: CreateCatDto) : Object {
      return {
        ...createCatDto
      }
    }
    
    findAll() {
      return {message : `This will return all cats`};
    }
    
    findOne(id: number) {
      console.log("support email : ", process.env.SUPPORT_EMAIL)
      return `This action returns a #${id} cat`;
    }

    update(id: string, updateCatDto: UpdateCatDto) {
      return `This action updates a #${id} cat`;
    }
  
    remove(id: string) {
      return `This action removes a #${id} cat`;
    }
}