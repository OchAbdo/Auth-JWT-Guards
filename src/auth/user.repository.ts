import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserCreate } from "./dtos/create-user.dto";

@Injectable()
export class UserRepository {
    private repo : Repository<User>

    constructor(private datasource : DataSource){
        this.repo = datasource.getRepository(User)
    }

    async createUser(newuser : UserCreate) : Promise<void>{
        const nu = await this.repo.create(newuser)
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


}