const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors')
const cookieParser = require('cookie-parser')
const queries = require('../Employee_Info_Web/lib/queries')
const dotenv = require('dotenv')
dotenv.config()


app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
  credentials: true
}))

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

server.listen(8000, () => console.log('Listening to port 8000'))

app.get('/:search', async (req, res) => {
   try {
        const { search } = req.params

        const db = queries.getDbQueriesInstance()
        const employee = await db.findEmployee(search)

        res.json({ success: employee.found, employee: employee.data, msg: employee.found? 'employee found' : 'employee not found' })

   } catch (e) {
        console.log(e)
        res.json({ error: e })
    }
}) 