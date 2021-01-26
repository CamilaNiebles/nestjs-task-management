import { Controller, Post, Body, UsePipes, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentials: AuthCredentials): Promise<void>{
        return this.authService.signUp(authCredentials);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentials: AuthCredentials): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentials);
    }

    /**
     * With a custom decorator we can declare what is the element that we 
     * want to get from the request object.
     * @param user 
     */
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log(user);
    }
}
