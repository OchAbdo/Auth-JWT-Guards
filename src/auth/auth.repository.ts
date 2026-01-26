import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
    private repo : Repository<User>

    constructor(private datasource : DataSource){
        this.repo = datasource.getRepository(User)
    }


    createUser(){

    }
}