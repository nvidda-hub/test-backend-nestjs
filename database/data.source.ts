import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
        type : 'mysql',
        host : 'localhost',
        port : 3306,
        username : 'root',
        password : 'narendra',
        database : 'test',
        entities : ['dist/src/**/*.entity.js'],
        migrations : ['dist/database/migrations/**/*.js']
}

export const dataSource = new DataSource(dataSourceOptions)

dataSource
.initialize()
.then(() => {
        console.log("database initialization success!!")
})
.catch(err => {
        console.error(`Database initializaiton failed | Reason : ${JSON.stringify(err)}`)
})