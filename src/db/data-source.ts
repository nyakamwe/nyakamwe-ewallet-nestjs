import { log } from 'console'
import { DataSource, DataSourceOptions } from 'typeorm'
require('dotenv').config()

const isTesting = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV === 'development'

log('ENV', process.env.NODE_ENV)

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    // entities: ['dist/**/*.entity.js'],
    entities: [isTesting ? 'src/**/*.entity.ts' :
        isDev ? 'dist/**/*.entity.js' : ''
    ],
    migrations: [isTesting ? 'src/db/migrations/*.ts' : 
        isDev ? 'dist/db/migrations/*.js' : ''
    ],
    migrationsRun: isTesting,
    // synchronize: isTesting
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
