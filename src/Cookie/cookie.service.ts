import { Injectable } from "@nestjs/common";

@Injectable()
export class CookieService {

    constructor(){}

    getCookie(req){
        const cookieValue = req.cookies['test2'];
        return `test2 cookie value : ${cookieValue}`
    }

    setCookie(res){
        res.cookie('test2', 'fejanwfiuer9489032fwnef', {httpOnly : true})
        return res.send('Cookie setted')
    }
}