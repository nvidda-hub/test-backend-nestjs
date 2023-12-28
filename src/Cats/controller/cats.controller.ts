import { Controller, Get, Query, Post, Body, Put, Param, Delete, Inject, HttpException, HttpStatus, BadRequestException, ParseIntPipe, DefaultValuePipe, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CreateCatDto } from '../dto/cat.create.dto';
import { UpdateCatDto } from '../dto/cat.update.dto';
import { CatService } from '../Services/cat.service';
import { CatModuleConstants } from '../cats.contants';
import { Roles } from 'src/Decorators/Roles.Decorator';
import { CustomValidationPipe2, joiDtoValidator } from 'src/Pipes/validation.pipe';
import { CacheInterceptor, ExcludeNullInterceptor, RequestLoggerInterceptor, ResponseInterceptor } from 'src/Interceptor';
import { CreateCatSchema } from '../Schema/create-cat.schema';

@Controller()
@UseInterceptors(RequestLoggerInterceptor, ResponseInterceptor, ExcludeNullInterceptor, CacheInterceptor)
export class CatsController {
  constructor(
    @Inject(CatModuleConstants.CAT_SERVICE)
    private catService : CatService
  ){}

  @Post()
  @Roles(['admin'])
  create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto)
  }


  @Get(':id')
  findOne(@Param('id', new DefaultValuePipe(0)) id: number) {
    return this.catService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(id, updateCatDto)

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(id)

  }
}