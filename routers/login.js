import express from "express";
const routeLogin = express.Router()

routeLogin.get('/', (req, res) => {
    res.send('login')
})

routeLogin.post('/', (req, res) => {
    res.send(req.body)
})

export default routeLogin