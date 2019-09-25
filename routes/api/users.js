const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Model to make queries
const User = require('../../models/User');

// @route   Post api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            // null if user does not exist
            if(user){
                return res.status(400).json({ msg: 'User already exists' });
            }

            const newUser = new User ({
                name,
                email,
                password
            });

            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    console.log('ye');
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            // send token
                            jwt.sign(
                                { id: user.id },
                                process.env.jwtSecret,
                                { expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err;
                                    // send user
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })                                
                                })
                        }).catch(err =>{
                            return res.status(400).json({ msg: 'Error saving user' });
                        })
                })
            })

        }).catch(err => {
            return res.status(400).json({ msg: 'Error in hash' });
        })
});


module.exports = router;