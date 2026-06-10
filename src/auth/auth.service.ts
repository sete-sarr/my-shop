import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService}from'../users/users.service'
import { JwtService } from '@nestjs/jwt';
import { access } from 'node:fs';


@Injectable() 
export class AuthService {
    constructor(private readonly usersservice:UsersService, private readonly jwtservice: JwtService ){}
    async validateUser(username:string, pass){
       const user = await this.usersservice.findOne(username)
       if(user&&user?.password===pass)
       {
        const playload=await {sub:user.id, username:user.username}
        return  {access_token:this.jwtservice.signAsync(playload)}
       }
       
       return  new UnauthorizedException('acces interdit')
    }
}
 