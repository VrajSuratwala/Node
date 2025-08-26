const express = require('express');
const app = express();
const { check, validationResult } = require('express-validator');
const multer = require('multer');

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', 'static');

// Serve static files
app.use(express.static('./static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload'));

// Configure multer for file uploads
var uploads = multer({
    dest: './upload',
});

// Registration page route
app.get('/', (req, res) => {
    res.render('registration', { errors: [] });
});

// Registration form submit route
app.post(
    '/Que1',
    uploads.fields([
        { name: 'profile', maxCount: 1 },
        { name: 'file', maxCount: 3 }
    ]),
    [
        check("username")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Username is required"),
        check("password")
            .notEmpty()
            .withMessage("Password is required")
            .matches(/^.{6,}$/)
            .withMessage("Enter At least 6 characters"),
        check("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email"),
        check("cpassword")
            .notEmpty()
            .withMessage("Confirm Password is required")
            .custom((value, { req }) => value === req.body.password)
            .withMessage("Passwords do not match"),
        check("gender")
            .notEmpty()
            .withMessage("Gender is required"),
        check("hobbies")
            .notEmpty()
            .withMessage("Select at least one hobby"),
    ],
    (req, res) => {
        // Get errors from express-validator
        const errors = validationResult(req).array();

        // Check for file upload errors
        if (!req.files || !req.files['profile']) {
            errors.push({ msg: "Profile image is required", param: "profile" });
        }
        if (!req.files || !req.files['file']) {
            errors.push({ msg: "At least one file must be uploaded", param: "file" });
        }

        // If errors, return registration page
        if (errors.length > 0) {
            return res.render("registration", { errors: errors });
        }

        // Prepare user data for showdata page
        const profile = req.files['profile']?.[0];
        const fileUploads = req.files['file'] || [];

        const user = {
            UserName: req.body.username,
            Email: req.body.email,
            Hobbies: Array.isArray(req.body.hobbies) ? req.body.hobbies.join(", ") : req.body.hobbies,
            Gender: req.body.gender,
            Profile: profile ? "/upload/" + profile.filename : "",
            File: fileUploads.map(f => "/upload/" + f.filename).join(", ")
        };

        // Render showdata page with user data
        res.render("showdata", { user, errors: [] });
    }
);

// Start the server
app.listen(8002, () => {
    console.log("Server running on http://localhost:8002");
});
