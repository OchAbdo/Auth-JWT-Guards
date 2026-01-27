import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreate } from './dtos/create-user.dto';
import { AuthCredential } from './dtos/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {

    constructor(private serviceAuth : AuthService ){}

    @Post("/signup")
    SignUp(@Body() newUser : UserCreate) : Promise<void>{
        return this.serviceAuth.SignUp(newUser)
    }

    @Post("/signin")
    SignIn(@Body() newUser : AuthCredential) : Promise<{accessJWT : string}>{
        return this.serviceAuth.SignIn(newUser)
    }


    @Post('/test')
    @UseGuards(AuthGuard())
    async test(@Req() req){
        
        console.log(req);
    }

}
