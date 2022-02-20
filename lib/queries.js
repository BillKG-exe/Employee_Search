const mysql = require('mysql')
const dotenv = require('dotenv')
const { resolve } = require('path/posix')
dotenv.config()

let instance = null

const connection  = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT 
})

connection.connect(err => {
    if(err) console.log(err)
    
    console.log('DB:', connection.state)
})

class DbQueries {
    static getDbQueriesInstance () {
        return instance? instance : new DbQueries() 
    }

    async findEmployee (identification) {
        try {   
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM employee_info WHERE matricule = ?'

                connection.query(query, [identification], (err, results) => {
                    if(err) reject(new Error(err.message))
                    resolve({
                        found: results.length !== 0,
                        data: results[0]  
                    })
                })
            })
            return response
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = DbQueries