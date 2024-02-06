import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";

@Injectable()
export class ConnectionService{
    constructor(@InjectConnection() private readonly connection: Connection){}

    getDbHandler(): Connection {
        return this.connection
    }
}
