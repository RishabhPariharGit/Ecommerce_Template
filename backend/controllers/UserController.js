
const UserModel = require('../Models/User');
const RoleModel=require('../Models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    try { 
        const { Name, Username, Email, Phone, Password, IsAdmin, IsSystemAdmin } = req.body;

        // Validate required fields
        if (!Name || !Username || !Email || !Phone || !Password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Create a new user instance
        const newUser = new UserModel({
            Name,
            Username,
            Email,
            Phone,
            Password: hashedPassword,
            IsAdmin,
            IsSystemAdmin
        });

        // Save the user
        const savedUser = await newUser.save();
        console.log("saved user",savedUser);
        if (!savedUser) {
            return res.status(500).json({ message: "User registration failed" });
        }

        // Assign Role if IsAdmin or IsSystemAdmin is true
        if (IsAdmin) {
            const adminRole = new RoleModel({
                RoleName: 'Admin',
                userId: savedUser._id // Correct casing (lowercase 'u')
            });

            await adminRole.save();
        }

        if (IsSystemAdmin) {
            const systemAdminRole = new RoleModel({
                RoleName: 'SystemAdmin',
                userId: savedUser._id
            });

            await systemAdminRole.save();
        }
        return res.status(200).json({ message: "User registered successfully", userId: savedUser._id });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const LoginUser = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        console.log(Username, Password);

        const user = await UserModel.findOne({ Username });
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: "User does not exist" });
        }

        // Compare Passwords
        const validPassword = await bcrypt.compare(Password, user.Password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Password" });
        }

        // Create JWT token
        const tokenPayload = {
            userId: user._id,
            email: user.email,
        };
        const jwtToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: '1h' });
        
        //storing cookie
          res.cookie('token', jwtToken, {
            httpOnly: false, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000, 
          });       
        return res.status(200).json({ jwtToken: jwtToken, message: "Login successful" });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



const UserDetails = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'SECRET');
        const user = await UserModel.findById(decoded.userId, '-Password'); // Exclude the Password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { RegisterUser, LoginUser, UserDetails };