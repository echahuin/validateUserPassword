const { Router } = require('express');
const config = require('../config');

const router = Router();

const jwt = require('jsonwebtoken');

const User = require('../models/User');
const verifyToken = require('./verifyToken')

//importante: encryptPassword es asincrono, por eso usamos el async await
router.post('/singup', async (req, res, next) => {

    const { username, email, password } = req.body;
    console.log(username)
    const user = new User({
        username: username,
        email: email,
        password: password
    });

    user.password = await user.encryptPassword(user.password)
    console.log(user);

    await user.save()

    const token = jwt.sign({ id: user._id }, 'unico', {
        expiresIn: 60 * 60 * 24
    });

    res.json({ auth: true, token })

    //res.json({ auth: true })
})


router.post('/singin', async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).send('the mail doesnt no exists')
    }

    const passwordIsValid = await user.validatePassword(password);

    console.log(passwordIsValid)
    if (!passwordIsValid) {
        return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, 'unico', {
        expiresIn: 60 * 60 * 24
    });
    res.json({ auth: true, token });
})


router.get('/me', verifyToken, async (req, res) => {

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).send('no use found')
    }
    res.json(user);

})


router.get('/', (req, res, next) => {

    res.json({ data: process.env.INIT_CWD, name: 'edgar' });
})

module.exports = router