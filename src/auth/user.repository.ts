import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserCreate } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserRepository {
    private repo : Repository<User>

    constructor(private datasource : DataSource){
        this.repo = datasource.getRepository(User)
    }

    async createUser(newuser : UserCreate) : Promise<void>{

        const {email,password , firstname , lastname} = newuser
        //salt for hash
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password , salt)

        const  nu = this.repo.create({email , password : hashedPassword , firstname , lastname})
        try{
        await this.repo.save(nu)
        }
        catch (e){
            if(e.code === "23505"){
                throw new ConflictException("Email already exists")
            }else {
                throw new InternalServerErrorException()
            }
        }
    }


    async findOne(email : string): Promise<UserCreate | null>{
       return await this.repo.findOneBy({email})
    }

    async findOnebyEmail(email : string) : Promise <User>{
        const user = await this.repo.findBy({email})
        console.log("ee" + user[0]);
        return user[0]
    }


}