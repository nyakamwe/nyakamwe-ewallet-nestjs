import { DataSource, DataSourceOptions } from 'typeorm'
require('dotenv').config()

const isTesting = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV === 'development'

export const dataSourceOptions: DataSourceOptions = {
    type: 'oracle',
    host: process.env.ORACLE_DB_HOST,
    port: parseInt(process.env.ORACLE_DB_PORT),
    password: process.env.ORACLE_DB_PASSWORD,
    username: process.env.ORACLE_DB_USERNAME,
    database: process.env.ORACLE_DB_NAME,
    // entities: ['dist/**/*.entity.js'],
    sid: process.env.ORACLE_SID,
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
