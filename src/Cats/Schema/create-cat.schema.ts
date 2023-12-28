import * as joi from "joi";
import { CatTypeEnum } from "../dto/cat.create.dto";

export const CreateCatSchema = joi.object({
    name : joi.string().required(),
    age : joi.number().positive().required(),
    breed : joi.string().optional(),
    type : joi.string().valid(...Object.keys(CatTypeEnum))
})