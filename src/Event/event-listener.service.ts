import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

export interface EventInterface {
    name : string,
    description : string
}

@Injectable()
export class EventListener {
    @OnEvent('user.search')
    handleUserSearchEvent(event : EventInterface){
        console.log('event occur', event)
    }

}