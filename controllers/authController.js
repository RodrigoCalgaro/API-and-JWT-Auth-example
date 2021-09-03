const bcrypt = require("bcrypt");
const saltRounds = 8;
const key = require("../config/JWTkey");
const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.User;

var authController = {};

/* Sign In */
authController.signIn = function (req, res) {
    let newUser = req.body;

    User.findOne({
        where: {
            email: newUser.email
        }
    }).then(user => {

        if (user) {
            return res.status(200).json({
                success: false,
                message: `El usuario ${ user.email } ya se encuentra registrado`,
                email: user.email
            });
        }

        newUser.password = bcrypt.hashSync(newUser.password, saltRounds)

        User.create(newUser).then(user => {
            res.status(200).json({
                success: true,
                message: "Signed up!",
                email: user.email
            })
        }).catch(error => {
            return res.status(500).json({
                success: false,
                message: "Internal error on create",
                error
            });
        })
    }).catch(error => {
        return res.status(500).json({
            success: false,
            message: "Internal error on find",
            error
        });
    })
};

/* Log In */
authController.logIn = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "Usuario Inexistente",
                email: email
            });
        }

        // Check Password
        let correctPass = bcrypt.compareSync(password, user.password);

        if (!correctPass) {
            return res.status(200).json({
                success: false,
                message: "Contraseña Incorrecta",
                email: user.email
            });
        }

        const payload = {
            userId: user.userId,
            name: user.nombre,
            apellido: user.apellido,
            email: user.email
        };

        const expiresIn = 24 * 60 * 60 * 1000
        const options = {
            expiresIn
        };

        jwt.sign(
            payload,
            key,
            options,
            (error, token) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        message: error,
                        email: user.email,
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Logged in",
                        email: user.email,
                        token,
                        expiresIn,
                    });
                }
            })
    }).catch(error => {
        return res.json({
            success: false,
            message: error,
            email: user.email,
        });
    });
};

/* Log Out */



module.exports = authController;