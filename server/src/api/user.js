const express = require('express');
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../model/userModel')
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/signup', [
    check('username', "Please Enter a Valid Username")
        .not()
        .isEmpty(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            });
        }

        const {
            username,
            password
        } = req.body;

        const userName = username, passWord = password;

        try {
            let user = await User.findOne({
                userName
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                userName,
                passWord
            });

            const salt = await bcrypt.genSalt(10);
            console.log(salt, 'saltHash:::::::');
            user.passWord = await bcrypt.hash(passWord, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            console.log(payload, 'payload::::::::::');

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: 10000
            },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        data: {
                            id: user._id,
                            userName: user.userName
                        },
                        token,
                        msg: 'Registered user successfully!'
                    });
                }
            );

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Error in Saving");
        }
    }
)

router.post("/login", [
    check("username", "Please enter a valid userName")
        .not()
        .isEmpty(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            password
        } = req.body;

        const userName = username, passWord = password;

        try {
            let user = await User.findOne({
                userName
            });
            if (!user)
                return res.send({
                    message: "User Not Exist"
                });

            console.log(passWord, 'passWord::::::::::');
            const isMatch = await bcrypt.compare(passWord, user.passWord);
            if (!isMatch)
                return res.send({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: 3600
            },
                (err, token) => {
                    if (err) throw err;
                    res.send({
                        code: 20000,
                        data: { token }
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.send({
                message: "Server Error"
            });
        }
    }
)

router.get('/info', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const result = await User.findById(id)
        if (!result)
            return res.send({
                message: "User Not Exist"
            });
        res.send(
            {
                code: 20000,
                data: {
                    roles: ['admin'],
                    introduction: 'I am a super administrator',
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                    name: 'Super Admin'
                }
            }
        )
    } catch (error) {
        res.send('error msg')
    }
})

module.exports = router