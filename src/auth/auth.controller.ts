import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreate } from './dtos/create-user.dto';
import { AuthCredential } from './dtos/auth-credential.dto';

@Controller('auth')
export class AuthController {

    constructor(private serviceAuth : AuthService){}

    @Post("/signup")
    SignUp(@Body() newUser : UserCreate) : Promise<void>{
        return this.serviceAuth.SignUp(newUser)
    }

    @Post("/signin")
    SignIn(@Body() newUser : AuthCredential) : Promise<string>{
        return this.serviceAuth.SignIn(newUser)
    }

}
