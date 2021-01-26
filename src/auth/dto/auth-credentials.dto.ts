import { IsNotEmpty, IsString, MaxLength, minLength, MinLength } from "class-validator";

export class AuthCredentials {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password:string;
}