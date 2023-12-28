import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ObjectSchema } from 'joi';

interface CustomPipe2Options {
  keyType?: string,
  showErrorMsg?: boolean
}



@Injectable()
export class CustomValidationPipe2 implements PipeTransform<any> {
  private keyType : string;
  private showErrorMsg : boolean;
  constructor(options?: CustomPipe2Options){
    this.keyType = options?.keyType || "default"
    this.showErrorMsg = options?.showErrorMsg || false
  }
  async transform(value: any, metaData: ArgumentMetadata) {
    console.log("metaData : ", metaData)
    console.log("this.keyType : ", this.keyType)
    console.log("this.showErrorMsg : ", this.showErrorMsg)
    if (!metaData.metatype || !this.toValidate(metaData.metatype)) {
      return value;
    }
    const object = plainToInstance(metaData.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {

        const customErrorObject = {
            property : errors[0].property,
            value : errors[0].value,
            constraints : errors[0].constraints
        }
      throw new BadRequestException(customErrorObject);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

@Injectable()
export class joiDtoValidator implements PipeTransform {
  constructor(private schema : ObjectSchema){

  }
  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)
    if(error){
      const errorMessages = error.details.map(err => err.message)
      throw new BadRequestException({
        message : errorMessages,
        error : "Validation failed"
      })
    }
    return value
  }
}