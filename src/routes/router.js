//External Imports
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const users = []

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_GMAIL,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    },
})
async function runEmail(key, to) {
    const objectEmail = await transporter.sendMail({
        text: `Olá Jovem Hobbit, utilize o Token a seguir para se autenticar: ${key}`,
        subject: 'Welcome to Mordor',
        from: 'Guilherme Beranger <guilherme.beranger264@gmail.com>',
        to: `${to}`
    })

    return (objectEmail)
}

//Routes
router.get('/', (req, res) => {
    res.status(200).send('hellow to shire')
})

router.post('/singup', async (req, res) => {
    try {
        const { email, senha } = req.body
        const hashPass = await bcrypt.hash(senha, 10)
        const user = {
            email,
            hashPass
        }
        users.push(user)
        res.status(200).send('Usuário cadastrado com sucesso')
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const user = users.find(user => user.email === email)
    if (user == null) {
        return res.status(400).send('Usuário não encontrado')
    }
    try {
        if (await bcrypt.compare(senha, user.hashPass)) {
            const token = jwt.sign(
                {email},
                process.env.SECRET,
                {expiresIn:8900}
            )
            const verifyEmail = await runEmail(token, email)
            res.status(200).send('Autenticação Realizada com Sucesso - Siga sua jornada por Email')
        } else {
            res.status(500).send('Usuário não encontrado')
        }
    } catch (error) {
        return
    }
})
module.exports = router