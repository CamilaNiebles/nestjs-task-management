import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    async signUp (authCredentials: AuthCredentials): Promise<void> {
        return await this.userRepository.signUp(authCredentials);
    }

    async signIn (authCredentials: AuthCredentials): Promise<{accessToken: string}>{
        const username = await this.userRepository.signIn(authCredentials);
        if(!username){
            throw new UnauthorizedException();
        }
        const payload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
