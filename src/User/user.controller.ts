import { BadGatewayException, BadRequestException, Body, Controller, DefaultValuePipe, FileTypeValidator, Get, Header, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Post, Req, Res, StreamableFile, UploadedFile, UploadedFiles, UseFilters, UseInterceptors } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateCatDto } from "src/Cats/dto/cat.create.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ResponseInterceptor } from "src/Interceptor";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { join } from "path";
import { IdException } from "src/Exception/id.exception";
import { IdExceptionFilter } from "src/Exception/id.exception-filter";
import { HttpExceptionFilter } from "src/Exception/http-exception.filter";


@Controller()
@UseInterceptors(ResponseInterceptor)
export class UserController {
    
    constructor(private userService : UserService){}

    @Post()
    async createUser(
        @Body('firstName') firstName : string,
        @Body('lastName') lastName : string,
        @Body('age', new DefaultValuePipe(0)) age : string,
        @Body('email', new DefaultValuePipe('example@test.com')) email : string,
        @Body('isVerified', new DefaultValuePipe(false)) isVerified : boolean,
    ) {
        const user : CreateUserDto = {
            firstName : firstName,
            lastName : lastName,
            age : age,
            email : email,
            isVerified : isVerified
        }
        console.log(`user : ${JSON.stringify(user)}`)
        // return this.userService.createUser(user)
    }
    
    @Get('/get-file')
    @Header('Content-Type', 'application/json')
    @Header('Content-Disposition', 'attachment; filename="package.json"')
    getStaticFile(): StreamableFile {
        const file = fs.createReadStream(join(process.cwd(), 'package.json'));
        return new StreamableFile(file);
    }

    @Post('/upload')
    @UseInterceptors(FileFieldsInterceptor(
        [
            {name : 'PAN', maxCount: 1},
            {name : 'AADHAR', maxCount: 1},
        ]
    ))
    async uploadFile(
        @UploadedFiles() files : Express.Multer.File[]
        ) {
        return this.userService.uploadFile(files)
    }

    @Get('/:id')
    async findById(
        @Req() request : Request,  
        @Param('id') id : string, 
        @Res({passthrough : true}) response : Response
    ) {
        if(id.length <= 6){
            throw new BadGatewayException("Recognized http filter")
        }
        console.log("type of id : ", typeof(id)) // type of id :  string without parseIntPipe
        return this.userService.findById(request,id, response)
    }
}