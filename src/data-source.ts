import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Scrap } from "./entity/Scrap"
import { Link } from "./entity/Link"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Scrap, Link],
    migrations: [],
    subscribers: [],
})


AppDataSource.initialize()