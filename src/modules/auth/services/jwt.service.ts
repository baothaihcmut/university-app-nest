import { Role } from 'src/common/enums/role';
import { UUID } from 'crypto';
import { Injectable } from "@nestjs/common";
import { JwtService  as LibJwtService} from '@nestjs/jwt';


interface GenerateAccessTokenArg{
    id:UUID;
    role: Role;
}

@Injectable()
export class JwtService {
    constructor(private jwtService: LibJwtService){}

    
}