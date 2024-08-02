import 'dotenv/config';
import express from 'express'
import chalk from 'chalk';
import { userRouter } from './routes/users.routes.js';
import { postRouter } from './routes/posts.routes.js';

const app = express();
const PORT = process.env.PORT || 9000
app.use(express.json())

app.use("/api", userRouter, postRouter)
app.use('*', (req, res) => {
    res.send({
        status: false,
        message: "uncorrect url",
        urls: [
            `http://localhost:${PORT}`,
            `http://localhost:${PORT}/api/users`,
            `http://localhost:${PORT}/api/users/1`,
            `http://localhost:${PORT}/api/posts`,
            `http://localhost:${PORT}/api/posts/user?id=1`,
            `http://localhost:${PORT}/api/posts/1`
        ]
    })
})
const listen = (e) => {
    const text = `
    ${chalk.red.bold('servers port')}
    ${chalk.green.bold('server')} is running on port ${chalk.blue.bold(`http://localhost:${PORT}`)}

    ${chalk.green.bold('users')} is running on port ${chalk.blue.bold(`http://localhost:${PORT}/api/users`)}
    ${chalk.green.bold('user by id')} is running on port: ${chalk.blue.bold(`http://localhost:${PORT}/api/users/1`)}
    ${chalk.green.bold('posts')} is running on port: ${chalk.blue.bold(`http://localhost:${PORT}/api/posts`)}
    ${chalk.green.bold('posts by user id')} is running on port: ${chalk.blue.bold(`http://localhost:${PORT}/api/posts/user?id=1`)}
    ${chalk.green.bold('posts by id')} is running on port:  ${chalk.blue.bold(`http://localhost:${PORT}/api/posts/1`)}
    `
    if (!e) console.log(text);
    else throw new Error
}

app.listen(PORT, listen)