const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model to make queries
const User = require('../../models/User');

// @route   GET api/users
// @desc    Register new user
// @access  Public


router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all field' });
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
                passowrd
            });

            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.passowrd, salt, (err, hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            // send token and user
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        })
                })
            })
        });
});


module.exports = router;