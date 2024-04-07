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


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../frontend/build")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
}

app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
})