import express from "express";
const authentication = express.Router()

authentication.get('/', (req, res) => {
    res.send('login')
})

authentication.post('/signUp', (req, res) => {
    res.send(req.body)
})

authentication.post( '/login', (req, res) => {
    res.send(req.body)

})

export default authentication
