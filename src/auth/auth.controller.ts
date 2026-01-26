import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreate } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private serviceAuth : AuthService){}

    @Post("/signup")
    SignUp(@Body() newUser : UserCreate) : Promise<void>{
        return this.serviceAuth.SignUp(newUser)
    }

}
