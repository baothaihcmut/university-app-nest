import { Injectable } from "@nestjs/common";
import { UsersRespository } from "../repositories/users.repository";

@Injectable()
export class UserInteractor {
    constructor(private userRepository: UsersRespository){}
}