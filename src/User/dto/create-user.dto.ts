import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName : string

    @IsNotEmpty()
    lastName : string

    @IsOptional()
    age : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsOptional()
    isVerified : boolean
}