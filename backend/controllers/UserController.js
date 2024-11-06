const UserModel = require('../Models/User');
const RoleModel = require('../Models/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USerModel = require('../Models/User');

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
        // Find the user by username
        const user = await UserModel.findOne({ Username });
        if (!user) {
            return res.status(401).json({ error: "User does not exist" });
        }

        // Compare Passwords
        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Password" });
        }

        // Create JWT token
        const tokenPayload = {
            userId: user._id,
            email: user.email,
        };
        const jwtToken = jwt.sign(tokenPayload, 'SECRET', { expiresIn: '1h' });
        // Set JWT as an HTTP-only cookie
        res.cookie('token', jwtToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Find the role associated with this user
        const roleData = await RoleModel.findOne({ userId: user._id });
        if (roleData != null) {
            const role = roleData.RoleName;
            res.cookie('role', role, {
                httpOnly: false, // Allow client-side access to the role cookie
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
        }

        // Optionally set the role as a non-httpOnly cookie for client-side access


        return res.status(200).json({ jwtToken: jwtToken, message: "Login successful" });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetAllUsers = async (req, res) => {
    try {
        // Fetch all users from the UserModel
        const Users = await UserModel.find();
        // If no users are found, return a 404 response
        if (!Users || Users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Fetch roles for all users by their userId
        const userIds = Users.map(user => user._id); // Extract user IDs

        const Roles = await RoleModel.find({ userId: { $in: userIds } })
            .select('RoleName userId -_id'); // Get only RoleName and userId

        // Map roles to the corresponding users
        const usersWithRoles = Users.map(user => {
            const userRoles = Roles.filter(role => role.userId.toString() === user._id.toString());
            return {
                ...user._doc, // Spread user properties
                Roles: userRoles.map(role => role.RoleName) // Include roles as an array of RoleNames
            };
        });

        // Return the users with roles in the response
        return res.status(200).json(usersWithRoles);
    } catch (err) {
        console.error("Error:", err);
        // Return a 500 status with an error message for any server-side error
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const GetUserByUsername = async (req, res) => {
    try {
        const { Username } = req.params;


        // Use regex for case-insensitive search
        const User = await UserModel.findOne({ Username: { $regex: new RegExp(Username, 'i') } });

        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(User);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const { Name, Username, Email, Phone, IsAdmin, IsSystemAdmin } = req.body;
        const { Username: currentUsername } = req.params;

        // Use regex for case-insensitive search to find the user by current username
        const user = await UserModel.findOne({
            Username: { $regex: new RegExp(`^${currentUsername}$`, 'i') }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the new username is already in use by another user
        if (Username && Username !== user.Username) {
            const existingUser = await UserModel.findOne({ Username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already in use by another user" });
            }
            user.Username = Username; // Update username
        }

        // Check if the new email is already in use by another user
        if (Email && Email !== user.Email) {
            const existingUser = await UserModel.findOne({ Email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
            user.Email = Email; // Update email
        }

        // Update other user details only if provided
        if (Name) user.Name = Name;
        if (Phone) user.Phone = Phone;

        // Save the updated user
        const updatedUser = await user.save();

        // Remove old roles and assign new ones if applicable
        await RoleModel.deleteMany({ userId: updatedUser._id });

        if (IsAdmin) {
            const adminRole = new RoleModel({
                RoleName: 'Admin',
                userId: updatedUser._id
            });
            await adminRole.save();
        }

        if (IsSystemAdmin) {
            const systemAdminRole = new RoleModel({
                RoleName: 'SystemAdmin',
                userId: updatedUser._id
            });
            await systemAdminRole.save();
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const DeleteUser = async (req, res) => {
    const { id } = req.params;

    try {

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const Role = await RoleModel.find({ UserId: user._id });

        await RoleModel.deleteMany({ UserId: user._id });
        await USerModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'User and Role  deleted successfully!' });
    } catch (err) {
        console.error("Error deleting User:", err);
        res.status(500).json({ message: 'Error deleting User', error: err });
    }
};

const GetUserProfile = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("token", token)
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, 'SECRET');
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            user
        });
    } catch (err) {
        console.error("Error:", err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { RegisterUser, LoginUser, GetUserByUsername, GetAllUsers, UpdateUser, DeleteUser,GetUserProfile };