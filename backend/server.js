const express = require('express')
const app = express()
const authRouter = require('./routers/auth.router')
const taskRouter = require('./routers/tasks.router')
const profileRouter = require('./routers/profile.router')
const connectMongo = require('./services/mongo')
const cors = require('cors')

const PORT = 3000

app.use(express.json())
app.use(cors())

connectMongo()

app.use('/auth',authRouter)

app.use('/tasks',taskRouter)

app.use('/profile',profileRouter)

app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})