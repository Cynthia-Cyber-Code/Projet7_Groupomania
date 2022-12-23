const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

const User = require("../models/user")

dotenv.config();

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                // token: req.body.token
            })
            user.save()
                .then(() => res.status(201).json({
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                userId: user._id,
                                isAdmin: user.isAdmin
                            },
                            process.env.JWTPRIVATEKEY,
                            { expiresIn: '24h' }
                        )
                    }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                userId: user._id,
                                isAdmin: user.isAdmin
                            },
                            process.env.JWTPRIVATEKEY,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.getAllUsers = (req, res) => {
    User.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(404).json({ error })
        });
};