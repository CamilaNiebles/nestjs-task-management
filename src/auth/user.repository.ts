import { Repository, EntityRepository } from "typeorm";
import { User } from './user.entity';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'; 

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp (authCredentials: AuthCredentials): Promise<void>{
        const { username, password } = authCredentials;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            if(error.code == 23505){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn (authCredentials: AuthCredentials){
        const { username, password } = authCredentials;
        const user = await this.findOne({ username });
        if(user && await user.validatePassword(password)){
            return username;
        }else{
            return null;
        }
    }

    private async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }
}