import { Injectable } from "@nestjs/common";
import { UsersRespository } from "src/modules/users/repositories/users.repository";

@Injectable()
export class AuthInteractor{
    constructor(private userRepo: UsersRespository){}

    

}