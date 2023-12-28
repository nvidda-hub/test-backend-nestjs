import { IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export enum CatTypeEnum {
    DOMESTIC = 'Domestic',
    SHORT_HAIRED = 'short-haired'
}

export class CreateCatDto {
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    @IsPositive()
    age : number;

    @IsOptional()
    breed : string;

    @IsOptional()
    type : CatTypeEnum;
}