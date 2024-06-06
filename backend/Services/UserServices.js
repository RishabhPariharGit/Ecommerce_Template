
const UserModel = require('../Model/User');
const RoleModel = require('../Model/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
    try {
        console.log(req.body)
        const { Name,Username,Email, Phone,Password, PropertyOwner, SystemAdmin } = req.body;

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ Email });
        
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
         console.log(hashedPassword)
        // Create a new user instance
        const newUser = new UserModel({ Name,Username,Email,Phone, password: hashedPassword, PropertyOwner, SystemAdmin });
       console.log(newUser)
        // Save the user
        const savedUser = await newUser.save();
        console.log(savedUser)
        if (!savedUser) {
            throw new Error("User registration failed");
        }

        // Assign roles if specified
        const rolesToAssign = [];
        if (PropertyOwner) {
            rolesToAssign.push({ USerId: savedUser._id, name: "PropertyOwner" });
        }
        if (SystemAdmin) {
            rolesToAssign.push({ USerId: savedUser._id, name: "SystemAdmin" });
        }
        if (rolesToAssign.length > 0) {
            await RoleModel.insertMany(rolesToAssign);
        }

        return res.status(200).json({ message: "User registered successfully", userId: savedUser._id });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const LoginUser = async (req, res) => {
    try {
        const { Username, Password } = req.body;
         console.log(Username,Password)
        // Find user by Username
        const user = await UserModel.findOne({ Username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: "User does not exist" });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(Password, user.password);
        console.log(validPassword)
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Password" });
        }
      
        // Create JWT token
      const tokenPayload = {
        userId: user._id,
        email: user.email,
       
    };
    const jwtToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: '1h' });
        // Find user's role
        const role = await RoleModel.findOne({ USerId: user._id });
        let message;
        if (!role) {
            message = "Login Successfully, Role not defined";
        } else if (role.name === "PropertyOwner") {
            message = "Login Successfully, It's Admin";
        } else if (role.name === "SystemAdmin") {
            message = "Login Successfully, It's SystemAdmin";
        } else {
            message = "Login Successfully, It's User";
        }

        return res.status(200).json({ message,jwtToken });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




module.exports = { RegisterUser, LoginUser };