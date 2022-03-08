const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const res = require('express/lib/response');

const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt')

const saltRounds = 10;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// SIGNUP - Create a new user in the db.
router.post("/signup", (req, res, next) => {
    const { email, password, name, city, country, profileImg } = req.body;

    if (!email ||
        !password ||
        !name ||
        !city ||
        !country
    ) {
        res.status(400).json({ message: "Please provide information in the required fields" })
        return
    }

    // Use regex to validate the email format.
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Email address is invalid' });
        return;
    }

    if (password.length < 4) {
        res.status(400).json({ message: 'Password has to be 4 chars min' })
        return
    }

    // Use regex to validate the password format
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!passwordRegex.test(password)) {
    //     res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    //     return;
    // }

    // Check the db if a user with the same email exists.
    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: "User already exits!" })
                return
            }

            // Hash the password.
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            return User.create({
                email,
                password: hashedPassword,
                name,
                city,
                country,
                profileImg
            })
        })
        .then((createdUser) => {
            // Deconstruct the newly created user object to omit the password. We should never expose passwords publicly.
            const { email, name } = createdUser;

            // Create a new object that doesn't expose the password.
            const user = { email, name };

            // Send a json response containing the user object.
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" })
        });

});

//LOGIN
//Verifies email & password and return a JWT.
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Please provide email and password" })
        return;
    }

    // Check the users collection if a user with the same email exists
    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ message: "User not found" })
                return;
            }

            // Compare the provided password with the one saved in the database.
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

            if (passwordCorrect) {
                // Deconstruct the user object to omit the password.
                const { _id, email, name } = foundUser;

                // Create an object that will be set as the token payload.
                const payload = { _id, email, name }

                // Create and sign the jwt.
                // jwt.sign(payload, secretKey, options)
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    // algorithm - Encryption algorithm (default HS256)
                    // expiresIn - A string describing expiration time span using ms package syntax.
                    { algorithm: "HS256", expiresIn: "600h" }
                );

                // Send the json response that contains the created token as an authentication token.
                // The client need to save this token on the client-side (browser)(local storage/memory).
                res.status(200).json({ authToken: authToken });
            } else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));


})

// Verify JWT stored on the client.
router.get('/verify', isAuthenticated, (req, res, next) => {
    // If JWT token is valid, the payload gets decoded by the isAuthenticated middleware and made available on 'req.payload'.
    console.log('req.payload', req.payload);

    // Send back the object with user data previously set as the payload token.
    res.status(200).json(req.payload);
})




module.exports = router;