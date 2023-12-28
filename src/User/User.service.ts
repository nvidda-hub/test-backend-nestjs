import { Repository } from "typeorm";
import { User } from "./User.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./User.repository";
import { plainToInstance } from "class-transformer";
import * as uuid from "uuid";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { MyLoggerService } from "src/Logger/logger.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

export interface UserNew {
    userId : number,
    username : string,
    password: string
}

export class UserService {
    private readonly users = [
        {
          userId: 1,
          username: 'nvidda',
          password: 'narendra',
        },
        {
          userId: 2,
          username: 'bvidda',
          password: 'aradhya',
        },
      ];
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager : Cache,

        private loggerService : MyLoggerService,

        private eventEmitter: EventEmitter2
    ){}

    async createUser(user : CreateUserDto){
        this.loggerService.log("Creating user ...")
        try {
            const userData = plainToInstance(User, 
                {
                    id: uuid.v1(),
                    ...user
                })
            const newUser = await UserRepository.insert(userData)
            if(newUser.raw.affectedRows){
                await this.cacheManager.set(`user-${userData.id}`, newUser)
                return true
            }
        }
        catch(error){
            console.log("error : ", error)
        }
        return false
    }

    async findAllUser() : Promise<User[]>{
        return await UserRepository.find()
    }

    async findById(request, id : string, response) : Promise<User>{
        this.eventEmitter.emit("user.search", {userId : id})
        this.loggerService.log(`Searching for userId with ${id} ...`)
        const value = await this.cacheManager.get(`user-${id}`)
        if(value){
            console.log("value : ", value)
            return
        }
        try {
            const user =  await UserRepository.findOne({where : {id}})
            return user
        }catch(err) {
            console.log("err : ", err)
        }
    }

    async uploadFile(files : Express.Multer.File[]){
        console.log("files : ", files)
        return
    }

    async findOne(username: string): Promise<UserNew> {
        return this.users.find(user => user.username === username);
    }
}
