import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../auth/user.repository';
import { UserCreate } from './dtos/create-user.dto';
import { AuthCredential } from './dtos/auth-credential.dto';
import * as bcrypt from 'bcrypt'
import { JWTPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private  repo : UserRepository ,
                private jwtService : JwtService
    ){}

    SignUp(newuser : UserCreate): Promise<void>{
       return this.repo.createUser(newuser)
    }

    async SignIn(credential : AuthCredential): Promise<{accessJWT : string}> {
        const {email ,  password} = credential 
        const user = await this.repo.findOne(email)
        if(user &&(await bcrypt.compare(password , user.password))){
            const paload : JWTPayload = {email}
            const accessJWT = await this.jwtService.sign(paload)
            return {accessJWT}
        }
        else{
            throw new UnauthorizedException("Please check your login credentails")
        }

    }
}
