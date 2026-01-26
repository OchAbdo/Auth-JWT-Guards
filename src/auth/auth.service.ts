import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { UserCreate } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private  repo : UserRepository){}

    SignUp(newuser : UserCreate): Promise<void>{
       return this.repo.createUser(newuser)
    }
}
