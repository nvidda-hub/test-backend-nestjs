import { Injectable } from "@nestjs/common";

@Injectable()
export class StoreService {
    constructor(){
        console.log("store service initialiszed")
    }
}