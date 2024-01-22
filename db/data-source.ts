import { DataSource, DataSourceOptions} from 'typeorm'
require('dotenv').config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    // entities: ['dist/**/*.entity.js'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
