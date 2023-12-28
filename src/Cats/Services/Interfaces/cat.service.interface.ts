import { CreateCatDto } from "src/Cats/dto/cat.create.dto"
import { UpdateCatDto } from "src/Cats/dto/cat.update.dto"

export interface ICatService {
    create(createCatDto: CreateCatDto) : object
    findOne(id: number) : string
    update(id: string, updateCatDto: UpdateCatDto) : string
    remove(id: string) : string
}