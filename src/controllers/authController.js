const { Router } = require('express')

const router = Router();

const User = require('../models/User');

router.get('/me', (req, res) => {
    res.json('me');
})

//importante: encryptPassword es asincrono, por eso usamos el aync await
router.post('/singup', async (req, res, next) => {

    const { username, email, password } = req.body;
    console.log(username)
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(iser.password)
    console.log(user);
    await user.save() // guardamos en la base de dts
    // ahora tenemos que enviarle un token al front
    res.json({ auth: true })
})
router.post('/singin', (req, res, next) => {
    res.json('singin');
})
router.get('/me', (req, res) => {
    res.json('me');
})
router.get('/', (req, res, next) => {
    res.json('hi');
})

module.exports = router