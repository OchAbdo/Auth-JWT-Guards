import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { ConfigService } from "@nestjs/config";
import { JWTPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

     constructor(
        private userRepo: UserRepository,
        private readonly configservice: ConfigService
    ) {
        
        super({
            secretOrKey: configservice.getOrThrow<string>("JWT_SECRET"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    async validate(payload : JWTPayload) : Promise<User>{
        const {email} = payload
        const user : User = await this.userRepo.findOnebyEmail(email)
        
        if(!user){
            throw new UnauthorizedException("have por" + user)
        } 
        return user
    }

    

}